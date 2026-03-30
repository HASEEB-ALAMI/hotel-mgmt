import styled from "styled-components";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import { Textarea } from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addCabins, updateCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

const FormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

const Label = styled.label`
  font-weight: 500;
`;

function CreateCabinForm({ cabinToEdit, onSuccess }) {
  const { id, ...editValues } = cabinToEdit || {};
  const isEdit = Boolean(id);
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset } = useForm({
    defaultValues: isEdit ? editValues : {}
  });
  const { mutate, isLoading } = useMutation({
    mutationFn: (payload) => (isEdit ? updateCabin(id, payload) : addCabins(payload)),
    onSuccess: () => {
      toast.success(isEdit ? 'Cabin updated successfully!' : 'Cabin added successfully!');
      queryClient.invalidateQueries({ queryKey: ['cabins'] });
      reset();
      if (isEdit && typeof onSuccess === 'function') onSuccess();
    },
    onError: (err) => toast.error('Error saving cabin: ' + (err?.message || err)),
  });


  function submitionHandler(data) {
    const payload = {
      ...data,
      maxCapacity: Number(data.maxCapacity),
      regularPrice: Number(data.regularPrice),
      discount: Number(data.discount ?? 0),
      image: data.image?.[0] || null,
    };
    mutate(payload);
  }
  return (
    <Form onSubmit={handleSubmit(submitionHandler)}>
      <FormRow>
        <Label htmlFor="name">Cabin name</Label>
        <Input type="text" id="name" {...register('name')}/>
      </FormRow>

      <FormRow>
        <Label htmlFor="maxCapacity">Maximum capacity</Label>
        <Input type="number" id="maxCapacity" {...register('maxCapacity')}/>
      </FormRow>

      <FormRow>
        <Label htmlFor="regularPrice">Regular price</Label>
        <Input type="number" id="regularPrice" {...register('regularPrice')}/>
      </FormRow>

      <FormRow>
        <Label htmlFor="discount">Discount</Label>
        <Input type="number" id="discount" defaultValue={0} {...register('discount')}/>
      </FormRow>

      <FormRow>
        <Label htmlFor="description">Description for website</Label>
        <Textarea id="description" defaultValue="" {...register('description')} />
      </FormRow>

      <FormRow>
        <Label htmlFor="image">Cabin photo</Label>
        <FileInput id="image" accept="image/*" type="file" {...register('image')} />
      </FormRow>

      <FormRow>
        {isEdit ? (
          <>
            <Button variation="secondary" type="button" onClick={() => onSuccess?.()}>Cancel</Button>
            <Button disabled={isLoading}>{isLoading ? 'Saving...' : 'Save changes'}</Button>
          </>
        ) : (
          <>
            <Button variation="secondary" type="reset">Reset</Button>
            <Button disabled={isLoading}>Add cabin</Button>
          </>
        )}
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
