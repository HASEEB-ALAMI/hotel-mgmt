import { useMutation, useQueryClient } from "@tanstack/react-query";
import styled from "styled-components";
import { deleteCabins } from "../../services/apiCabins";
import toast from "react-hot-toast";
import { useState } from "react";
import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal";

const columns = "90px 2fr 1fr 1fr 1fr 140px";

const Row = styled.div`
  display: grid;
  grid-template-columns: ${columns};
  background-color: white;
  border-top: 1px solid var(--color-grey-200);

  & > div {
    padding: 1.4rem;
    border-right: 1px solid var(--color-grey-200);
    display: flex;
    align-items: center;
    min-width: 0;
  }

  & > div:last-child {
    border-right: none;
  }

  @media (max-width: 700px) {
    grid-template-columns: 80px 1fr;
    grid-template-areas:
      "img name"
      "img capacity"
      "img price"
      "img discount"
      "actions actions";
    border: 1px solid var(--color-grey-200);
    border-radius: 12px;
    box-shadow: var(--shadow-sm);
    overflow: hidden;
    margin-bottom: 1rem;

    & > div {
      border-right: none;
      padding: 1rem 1.2rem;
      align-items: flex-start;
    }

    & > *:nth-child(1) {
      grid-area: img;
      justify-content: center;
      align-items: center;
    }
    & > *:nth-child(2) {
      grid-area: name;
    }
    & > *:nth-child(3) {
      grid-area: capacity;
      justify-content: flex-start;
      &::before {
        content: "Capacity";
        font-size: 1.2rem;
        font-weight: 700;
        color: var(--color-grey-500);
        margin-right: 0.8rem;
      }
    }
    & > *:nth-child(4) {
      grid-area: price;
      justify-content: flex-start;
      &::before {
        content: "Price";
        font-size: 1.2rem;
        font-weight: 700;
        color: var(--color-grey-500);
        margin-right: 0.8rem;
      }
    }
    & > *:nth-child(5) {
      grid-area: discount;
      justify-content: flex-start;
      &::before {
        content: "Discount";
        font-size: 1.2rem;
        font-weight: 700;
        color: var(--color-grey-500);
        margin-right: 0.8rem;
      }
    }
    & > *:nth-child(6) {
      grid-area: actions;
      justify-content: flex-start;
      border-top: 1px solid var(--color-grey-200);
    }
  }
`;

const Img = styled.img`
  width: 70px;
  height: 48px;
  object-fit: cover;
  border-radius: 4px;
`;

const Name = styled.div`
  font-weight: 600;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  @media (max-width: 700px) {
    white-space: normal;
  }
`;

const NumCell = styled.div`
  justify-content: flex-end;
  font-variant-numeric: tabular-nums;
`;

const DeleteBtn = styled.button`
  border: none;
  background: #ef4444;
  color: white;
  padding: 6px 10px;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background: #dc2626;
  }
`;
const EditBtn = styled.button`
  border: none;
  background: #3670db;
  color: white;
  padding: 6px 10px;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background: #0c50ce;
  }
`;

const Actions = styled.div`
  display: flex;
  gap: 8px;
  justify-content: flex-end;
  align-items: center;
  flex-wrap: wrap;

  @media (max-width: 700px) {
    justify-content: flex-start;
  }
`;


export default function CabinRow({ cabin }) {
  const queryClient = useQueryClient();
  const [edit, setEdit] = useState(false);
  const { isLoading, mutate } = useMutation({
    mutationFn: (id) => deleteCabins(id),
    onError: (err, vars) => {
      console.error('delete mutation error', err, vars);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      toast.success('Cabin deleted successfully');
    },
  });

  function handleDelete() {
    mutate(cabin.id);
  }
  function handleEdit() {
    setEdit((e) => !e);
  }
  return (
    <Row>
      <div>
        <Img src={cabin.image} alt={cabin.name} />
      </div>

      <Name>{cabin.name}</Name>

      <NumCell>
        {cabin.maxCapacity ?? cabin.capacity ?? "-"}
      </NumCell>

      <NumCell>
        {cabin.regularPrice ?? cabin.price ?? "-"}
      </NumCell>

      <NumCell>{cabin.discount ?? 0}</NumCell>

      <Actions>
        <DeleteBtn onClick={handleDelete} disabled={isLoading}>Delete</DeleteBtn>
        <EditBtn onClick={handleEdit} disabled={isLoading}>Edit</EditBtn>
      </Actions>
      {edit && (
        <Modal onClose={() => setEdit(false)}>
          <CreateCabinForm cabinToEdit={cabin} onSuccess={() => setEdit(false)} />
        </Modal>
      )}
    </Row>
  );
}
