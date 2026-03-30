import Row from "../ui/Row";
import BookingTable from "../features/bookings/BookingTable";
import PageHeader from "../ui/PageHeader";


function Bookings() {
  return (
    <>
      <PageHeader title="Bookings" subtitle="Browse and review recent bookings" />
      <Row>
        <BookingTable />
      </Row>
    </>
  );
}

export default Bookings;
