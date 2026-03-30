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
  }

  & > div:last-child {
    border-right: none;
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
