import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import styled from "styled-components";
import { createBookingLocal, getBookings } from "../../services/apiBookings";
import BookingRow from "../bookings/BookingRow";
import Spinner from "../../ui/Spinner";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useState } from "react";
import { getCabins } from "../../services/apiCabins";
import toast from "react-hot-toast";

const columns = "90px 2.4fr 2fr 2.2fr 1.4fr 1.2fr";

const Table = styled.div`
  border: 1px solid var(--color-grey-300);
  border-radius: 8px;
  overflow: hidden;
  font-size: 1.4rem;
`;

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: ${columns};
  background-color: var(--color-grey-100);
  font-weight: 600;

  & > div {
    padding: 1.4rem;
    border-right: 1px solid var(--color-grey-300);
  }

  & > div:last-child {
    border-right: none;
  }
`;

const NumHeader = styled.div`
  text-align: right;
`;

const Toolbar = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 1.2rem 0;
`;

const FormCard = styled.div`
  margin-top: 1.2rem;
`;

export default function BookingTable() {
  const queryClient = useQueryClient();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    guestName: "",
    guestEmail: "",
    cabinId: "",
    startDate: "",
    endDate: "",
    numGuests: 1,
    totalPrice: 0,
    isPaid: false,
  });

  const { data: bookings, isLoading, isError, error } = useQuery({
    queryKey: ["bookings"],
    queryFn: getBookings,
  });

  const { data: cabins } = useQuery({ queryKey: ["cabins"], queryFn: getCabins });

  const { mutateAsync, isLoading: isCreating } = useMutation({
    mutationFn: createBookingLocal,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },
  });

  if (isLoading) return <Spinner />;
  if (isError) return <p>Error: {error?.message ?? "Failed to load bookings"}</p>;

  async function onSubmit(e) {
    e.preventDefault();

    if (!form.guestName.trim() || !form.guestEmail.trim()) {
      toast.error("Please enter guest name and email");
      return;
    }

    const cabin = (cabins || []).find((c) => String(c.id) === String(form.cabinId));
    if (!cabin) {
      toast.error("Please select a cabin");
      return;
    }

    if (!form.startDate || !form.endDate) {
      toast.error("Please select start and end date");
      return;
    }

    if (new Date(form.endDate) <= new Date(form.startDate)) {
      toast.error("End date must be after start date");
      return;
    }

    const payload = {
      startDate: form.startDate,
      endDate: form.endDate,
      numGuests: Number(form.numGuests || 1),
      totalPrice: Number(form.totalPrice || 0),
      isPaid: Boolean(form.isPaid),
      cabins: cabin,
      guests: { fullName: form.guestName.trim(), email: form.guestEmail.trim() },
    };

    try {
      await mutateAsync(payload);
      toast.success("Booking added (local)");
      setShowForm(false);
      setForm({
        guestName: "",
        guestEmail: "",
        cabinId: "",
        startDate: "",
        endDate: "",
        numGuests: 1,
        totalPrice: 0,
        isPaid: false,
      });
    } catch (err) {
      toast.error(err?.message || "Could not add booking");
    }
  }

  return (
    <>
    <Toolbar>
      <Button variation="secondary" onClick={() => setShowForm((s) => !s)}>
        {showForm ? "Close" : "Add booking"}
      </Button>
    </Toolbar>

    <Table>
      <TableHeader>
        <div></div>
        <div>Guest</div>
        <div>Cabin</div>
        <div>Dates</div>
        <div>Status</div>
        <NumHeader>Total</NumHeader>
      </TableHeader>

      {bookings?.map((booking) => (
        <BookingRow key={booking.id} booking={booking} />
      ))}
    </Table>

    {showForm ? (
      <FormCard>
        <Form onSubmit={onSubmit}>
          <FormRow label="Guest name" orientation="vertical">
            <Input
              value={form.guestName}
              onChange={(e) => setForm((p) => ({ ...p, guestName: e.target.value }))}
              placeholder="e.g. Sara Lee"
            />
          </FormRow>

          <FormRow label="Guest email" orientation="vertical">
            <Input
              type="email"
              value={form.guestEmail}
              onChange={(e) => setForm((p) => ({ ...p, guestEmail: e.target.value }))}
              placeholder="e.g. sara@example.com"
            />
          </FormRow>

          <FormRow label="Cabin id" orientation="vertical">
            <Input
              value={form.cabinId}
              onChange={(e) => setForm((p) => ({ ...p, cabinId: e.target.value }))}
              placeholder={`Pick one: ${(cabins || []).slice(0, 5).map((c) => c.id).join(", ")}`}
            />
          </FormRow>

          <FormRow label="Start date" orientation="vertical">
            <Input
              type="date"
              value={form.startDate}
              onChange={(e) => setForm((p) => ({ ...p, startDate: e.target.value }))}
            />
          </FormRow>

          <FormRow label="End date" orientation="vertical">
            <Input
              type="date"
              value={form.endDate}
              onChange={(e) => setForm((p) => ({ ...p, endDate: e.target.value }))}
            />
          </FormRow>

          <FormRow label="Guests" orientation="vertical">
            <Input
              type="number"
              min="1"
              value={form.numGuests}
              onChange={(e) => setForm((p) => ({ ...p, numGuests: e.target.value }))}
            />
          </FormRow>

          <FormRow label="Total price" orientation="vertical">
            <Input
              type="number"
              min="0"
              value={form.totalPrice}
              onChange={(e) => setForm((p) => ({ ...p, totalPrice: e.target.value }))}
            />
          </FormRow>

          <FormRow label="Paid? (true/false)" orientation="vertical">
            <Input
              value={form.isPaid ? "true" : "false"}
              onChange={(e) =>
                setForm((p) => ({ ...p, isPaid: e.target.value.toLowerCase() === "true" }))
              }
              placeholder="false"
            />
          </FormRow>

          <FormRow>
            <Button disabled={isCreating}>{isCreating ? "Adding..." : "Add booking"}</Button>
          </FormRow>
        </Form>
      </FormCard>
    ) : null}
    </>
  );
}
