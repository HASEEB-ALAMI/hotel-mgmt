import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { getSettings } from "../services/apiSettings";
import UpdateSettingsForm from "../features/settings/UpdateSettingsForm";
import { useState } from "react";
import PageHeader from "../ui/PageHeader";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;

const Card = styled.div`
  background: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  padding: 2.4rem;
  box-shadow: var(--shadow-md);
  border: 1px solid var(--color-grey-200);

  @media (max-width: 640px) {
    padding: 1.6rem;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 2.4rem;

  @media (max-width: 640px) {
    gap: 1.2rem;
  }
`;

const SettingBox = styled.div`
  background: var(--color-grey-50);
  padding: 2rem;
  border-radius: 14px;
  border: 1px solid var(--color-grey-200);
  transition: all 0.25s ease;

  display: flex;
  flex-direction: column;
  gap: 0.8rem;

  &:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-sm);
  }

  @media (max-width: 640px) {
    padding: 1.6rem;
  }
`;

const Label = styled.span`
  font-size: 1.3rem;
  font-weight: 500;
  color: var(--color-grey-600);
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const Value = styled.span`
  font-size: 2rem;
  font-weight: 700;
  color: var(--color-grey-800);
`;

const EditButton = styled.button`
  background: ${({ active }) =>
    active ? "var(--color-red-700)" : "var(--color-brand-600)"};
  color: var(--color-grey-0);
  border: none;
  padding: 0.9rem 1.6rem;
  border-radius: 10px;
  font-weight: 600;
  font-size: 1.4rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
  }
`;

const FormWrapper = styled.div`
  background: var(--color-grey-0);
  padding: 2.4rem;
  border-radius: var(--border-radius-lg);
  border: 1px solid var(--color-grey-200);
  box-shadow: var(--shadow-md);

  @media (max-width: 640px) {
    padding: 1.6rem;
  }
`;

const PolicyList = styled.ul`
  margin-top: 2rem;
  display: grid;
  gap: 0.8rem;
  color: var(--color-grey-700);
  font-size: 1.4rem;

  & li {
    padding: 0.8rem 1rem;
    border-radius: var(--border-radius-md);
    background: var(--color-grey-50);
    border: 1px solid var(--color-grey-200);
  }
`;

function Settings() {
  const [isEdit, setIsEdit] = useState(false);

  const { isLoading, error, data } = useQuery({
    queryKey: ["setting"],
    queryFn: getSettings,
  });

  if (isLoading) return <p>Loading settings...</p>;
  if (error) return <p>Something went wrong. Please try again.</p>;

  const policyNotes = [
    "Free cancellation up to 24 hours before check-in",
    "Breakfast is optional and billed per guest",
    "Quiet hours: 10:00 PM – 7:00 AM",
    "A valid ID is required at check-in",
    "No smoking inside cabins",
  ];

  return (
    <Wrapper>
      <PageHeader
        title="Settings"
        subtitle="Booking rules and pricing policy"
        actions={
          <EditButton active={isEdit} onClick={() => setIsEdit((prev) => !prev)}>
            {isEdit ? "Close" : "Edit Settings"}
          </EditButton>
        }
      />

      <Card>
        <Grid>
          <SettingBox>
            <Label>Minimum booking length</Label>
            <Value>{data.minBookingLength} nights</Value>
          </SettingBox>

          <SettingBox>
            <Label>Maximum booking length</Label>
            <Value>{data.maxBookingLength} nights</Value>
          </SettingBox>

          <SettingBox>
            <Label>Maximum guests per booking</Label>
            <Value>{data.maxGuestPerBooking} guests</Value>
          </SettingBox>

          <SettingBox>
            <Label>Breakfast price</Label>
            <Value>${data.breakfastPrice}</Value>
          </SettingBox>
        </Grid>

        <PolicyList>
          {policyNotes.map((note) => (
            <li key={note}>{note}</li>
          ))}
        </PolicyList>
      </Card>

      {isEdit && (
        <FormWrapper>
          <UpdateSettingsForm />
        </FormWrapper>
      )}
    </Wrapper>
  );
}

export default Settings;
