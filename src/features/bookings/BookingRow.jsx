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
    min-width: 0;
  }

  & > div:last-child {
    border-right: none;
  }

  @media (max-width: 700px) {
    grid-template-columns: 80px 1fr;
    grid-template-areas:
      "img guest"
      "img cabin"
      "img dates"
      "img status"
      "img total";
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
      grid-area: guest;
    }
    & > *:nth-child(3) {
      grid-area: cabin;
      &::before {
        content: "Cabin";
        font-size: 1.2rem;
        font-weight: 700;
        color: var(--color-grey-500);
        margin-right: 0.8rem;
      }
    }
    & > *:nth-child(4) {
      grid-area: dates;
      &::before {
        content: "Dates";
        font-size: 1.2rem;
        font-weight: 700;
        color: var(--color-grey-500);
        margin-right: 0.8rem;
      }
    }
    & > *:nth-child(5) {
      grid-area: status;
      &::before {
        content: "Status";
        font-size: 1.2rem;
        font-weight: 700;
        color: var(--color-grey-500);
        margin-right: 0.8rem;
      }
    }
    & > *:nth-child(6) {
      grid-area: total;
      justify-content: flex-start;
      &::before {
        content: "Total";
        font-size: 1.2rem;
        font-weight: 700;
        color: var(--color-grey-500);
        margin-right: 0.8rem;
      }
    }
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
  min-width: 0;

  & span {
    font-weight: 500;
    color: var(--color-grey-500);
    font-size: 1.2rem;
    overflow-wrap: anywhere;
  }
`;

const NumCell = styled.div`
  justify-content: flex-end;
  font-variant-numeric: tabular-nums;

  @media (max-width: 700px) {
    justify-content: flex-start;
  }
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
