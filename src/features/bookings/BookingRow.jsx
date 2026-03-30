import styled from "styled-components";

const columns = "90px 2.4fr 2fr 2.2fr 1.4fr 1.2fr";

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

const Guest = styled.div`
  font-weight: 600;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span {
    font-weight: 500;
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

const NumCell = styled.div`
  justify-content: flex-end;
  font-variant-numeric: tabular-nums;
`;

const Tag = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  padding: 0.3rem 0.8rem;
  border-radius: 999px;
  font-size: 1.2rem;
  font-weight: 700;
  border: 1px solid var(--color-grey-200);

  background: ${(props) => {
    if (props.status === "checked-in") return "var(--color-green-100)";
    if (props.status === "checked-out") return "var(--color-silver-100)";
    return "var(--color-yellow-100)";
  }};

  color: ${(props) => {
    if (props.status === "checked-in") return "var(--color-green-700)";
    if (props.status === "checked-out") return "var(--color-silver-700)";
    return "var(--color-yellow-700)";
  }};
`;

function formatRange(startDate, endDate) {
  const fmt = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" });
  const start = startDate ? fmt.format(new Date(startDate)) : "—";
  const end = endDate ? fmt.format(new Date(endDate)) : "—";
  return `${start} → ${end}`;
}

export default function BookingRow({ booking }) {
  const guestName = booking?.guests?.fullName ?? "Unknown guest";
  const guestEmail = booking?.guests?.email ?? "";
  const cabinName = booking?.cabins?.name ?? "—";
  const cabinImage = booking?.cabins?.image ?? "/dashboard-1.svg";
  const range = formatRange(booking?.startDate, booking?.endDate);
  const status = booking?.status ?? "unconfirmed";
  const total = Number(booking?.totalPrice ?? 0);

  return (
    <Row>
      <div>
        <Img src={cabinImage} alt={cabinName} />
      </div>

      <Guest>
        {guestName}
        {guestEmail ? <span>{guestEmail}</span> : null}
      </Guest>

      <div>{cabinName}</div>

      <div>{range}</div>

      <div>
        <Tag status={status}>{String(status).replace("-", " ")}</Tag>
      </div>

      <NumCell>${total.toLocaleString()}</NumCell>
    </Row>
  );
}
