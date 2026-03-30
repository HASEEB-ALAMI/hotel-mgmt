import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import Button from '../../ui/Button';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { getSettings, updateSetting } from '../../services/apiSettings';
import toast from 'react-hot-toast';

function UpdateSettingsForm() {
  const queryClient = useQueryClient();
  const { data: settings, isLoading } = useQuery({ queryKey: ['setting'], queryFn: getSettings });

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      minBookingLength: undefined,
      maxBookingLength: undefined,
      maxGuestPerBooking: undefined,
      breakfastPrice: undefined,
    },
  });

  // reset form when settings are loaded
  useEffect(() => {
    if (settings) {
      reset({
        minBookingLength: settings.minBookingLength,
        maxBookingLength: settings.maxBookingLength,
        maxGuestPerBooking: settings.maxGuestPerBooking,
        breakfastPrice: settings.breakfastPrice,
      });
    }
  }, [settings, reset]);

  const { mutateAsync, isLoading: isSaving } = useMutation({
    mutationFn: updateSetting,
    onSuccess: () => {
      toast.success('Settings updated');
      queryClient.invalidateQueries({ queryKey: ['setting'] });
    },
    onError: (err) => {
      toast.error('Failed to update settings: ' + (err?.message || err));
    },
  });

  async function onSubmit(values) {
    const payload = {
      minBookingLength: Number(values.minBookingLength),
      maxBookingLength: Number(values.maxBookingLength),
      maxGuestPerBooking: Number(values.maxGuestPerBooking),
      breakfastPrice: Number(values.breakfastPrice),
    };
    try {
      await mutateAsync(payload);
    } catch (e) {
      // error handled in onError
    }
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Minimum nights/booking">
        <Input type="number" {...register('minBookingLength')} />
      </FormRow>

      <FormRow label="Maximum nights/booking">
        <Input type="number" {...register('maxBookingLength')} />
      </FormRow>

      <FormRow label="Maximum guests/booking">
        <Input type="number" {...register('maxGuestPerBooking')} />
      </FormRow>

      <FormRow label="Breakfast price">
        <Input type="number" {...register('breakfastPrice')} />
      </FormRow>

      <FormRow>
        <Button type="submit" disabled={isSaving || isLoading}>{isSaving ? 'Saving...' : 'Save settings'}</Button>
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
