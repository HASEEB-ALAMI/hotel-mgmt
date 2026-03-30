import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { getCabins } from "../../services/apiCabins";
import CabinRow from "./CabinRow";
import Spinner from "../../ui/Spinner";
import Button from "../../ui/Button";
import { useState } from "react";
import CreateCabinForm from "./CreateCabinForm";

const columns = "90px 2fr 1fr 1fr 1fr 140px";

const Table = styled.div`
  border: 1px solid var(--color-grey-300);
  border-radius: 8px;
  overflow: hidden;
  font-size: 1.4rem;

  @media (max-width: 700px) {
    border: none;
    border-radius: 0;
    overflow: visible;
  }
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

  @media (max-width: 700px) {
    display: none;
  }
`;

const NumHeader = styled.div`
  text-align: right;
`;

export default function CabinTable() {
  const [showForm, setShowForm] = useState(false);
  const { data: cabins, isLoading, isError, error } = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabins,
  });

  if (isLoading) return <Spinner />;
  if (isError) return <p>Error: {error?.message ?? "Failed to load cabins"}</p>;

  return (
    <>
    <Table>
      <TableHeader>
        <div></div>
        <div>Cabin</div>
        <NumHeader>Capacity</NumHeader>
        <NumHeader>Price</NumHeader>
        <NumHeader>Discount</NumHeader>
        <div></div>
      </TableHeader>

      {cabins?.map((cabin) => (
        <CabinRow key={cabin.id} cabin={cabin} />
      ))}
    </Table>
    <Button onClick={() => setShowForm((show => !show))}>{showForm ? "Close form" : "Add cabin"}</Button>
    {showForm && <CreateCabinForm/>}
    </>
  );
}
