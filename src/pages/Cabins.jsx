import Row from "../ui/Row";
import CabinTable from "../features/cabins/CabinTable";
import PageHeader from "../ui/PageHeader";


function Cabins() {
  return (
    <>
      <PageHeader title="Cabins" subtitle="All existing cabins in your hotel" />
      <Row>
        <CabinTable />
      </Row>
    </>
  );
}

export default Cabins;
