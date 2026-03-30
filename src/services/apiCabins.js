import supabase, { supabaseUrl } from "./supabase";
import { mockCabins } from "../data/mockData";

// Ensure this matches the bucket name in your Supabase project
const BUCKET = "cabin-images";

export async function getCabins() {
  if (!supabase) return mockCabins;

  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.warn("Supabase cabins fetch failed; using mock data.", error);
    return mockCabins;
  }

  if (!data?.length) return mockCabins;
  if (data.length >= 5) return data;

  const existingIds = new Set(data.map((c) => c?.id));
  const padded = [...data, ...mockCabins.filter((c) => !existingIds.has(c.id))];
  return padded.slice(0, 5);

}
export async function deleteCabins(id) {
    
    if (!supabase) throw new Error("Supabase is not configured");

    let { data, error } = await supabase
      .from('cabins')
      .delete()
      .eq('id', id)
    if (error) {
        console.error('Error deleting cabin:', error);
        throw error;
    }

    return data;

}
export async function addCabins(newCabin) {
    if (!supabase) throw new Error("Supabase is not configured");

    // If no image is provided, skip upload and insert cabin without image
    let imageName;
    let imagePath = null;

    if (newCabin.image) {
      imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll('/', '-');

      // Upload image first so we don't create a DB row for a cabin without its image
      const { error: uploadError } = await supabase.storage
        .from(BUCKET)
        .upload(imageName, newCabin.image);

      if (uploadError) {
        console.error('Error uploading cabin image:', uploadError);
        const uploadMsg = (uploadError && (uploadError.message || uploadError.error)) || String(uploadError);
        if (uploadMsg.toLowerCase().includes('bucket not found')) {
          throw new Error(`Supabase storage bucket "${BUCKET}" not found. Create the bucket in your Supabase project (Storage → Buckets) and make it public, or change the bucket name in src/services/apiCabins.js.`);
        }
        throw uploadError;
      }

      imagePath = `${supabaseUrl}/storage/v1/object/public/${BUCKET}/${imageName}`;
    }

    const payload = { ...newCabin };
    if (imagePath) payload.image = imagePath;
    else delete payload.image;

    const { data, error } = await supabase
      .from('cabins')
      .insert([payload])
      .select();

    if (error) {
      console.error('Error adding cabin:', error);
      // if DB insert fails, try to remove the uploaded file
      if (imageName) {
        try {
          await supabase.storage.from(BUCKET).remove([imageName]);
        } catch (removeErr) {
          console.error('Error removing uploaded image after DB failure:', removeErr);
        }
      }
      throw error;
    }

    // Supabase returns an array of inserted rows; return the first one
    return Array.isArray(data) ? data[0] : data;

}

export async function updateCabin(id, updatedCabin) {
  if (!supabase) throw new Error("Supabase is not configured");

  let imageName;
  let imagePath = null;

  const payload = { ...updatedCabin };

  // If a File object is provided for `image`, upload it and set the path.
  if (updatedCabin.image instanceof File) {
    imageName = `${Math.random()}-${updatedCabin.image.name}`.replaceAll('/', '-');

    const { error: uploadError } = await supabase.storage
      .from(BUCKET)
      .upload(imageName, updatedCabin.image);

    if (uploadError) {
      console.error('Error uploading cabin image:', uploadError);
      const uploadMsg = (uploadError && (uploadError.message || uploadError.error)) || String(uploadError);
      if (uploadMsg.toLowerCase().includes('bucket not found')) {
        throw new Error(`Supabase storage bucket "${BUCKET}" not found. Create the bucket in your Supabase project (Storage → Buckets) and make it public, or change the bucket name in src/services/apiCabins.js.`);
      }
      throw uploadError;
    }

    imagePath = `${supabaseUrl}/storage/v1/object/public/${BUCKET}/${imageName}`;
    payload.image = imagePath;
  } else {
    // Do not include image in payload if no new file was provided (keeps existing image)
    delete payload.image;
  }

  const { data, error } = await supabase
    .from('cabins')
    .update(payload)
    .eq('id', id)
    .select();

  if (error) {
    console.error('Error updating cabin:', error);
    if (imageName) {
      try {
        await supabase.storage.from(BUCKET).remove([imageName]);
      } catch (removeErr) {
        console.error('Error removing uploaded image after DB failure:', removeErr);
      }
    }
    throw error;
  }

  return Array.isArray(data) ? data[0] : data;
}
