import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Heading from "../ui/Heading";
import Stat from "../features/dashboard/Stat";
import DashboardBox from "../features/dashboard/DashboardBox";
import { getBookings } from "../services/apiBookings";
import { getCabins } from "../services/apiCabins";
import { getSettings } from "../services/apiSettings";
import PageHeader from "../ui/PageHeader";

const StatGrid = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.4rem;
  margin: 2.4rem 0;
`;

const Section = styled.section`
  margin-top: 2.4rem;
`;

const QuickLinks = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
`;

const QuickLink = styled(Link)`
  background-color: var(--color-grey-100);
  border-radius: 10px;
  padding: 0.8rem 1rem;
  color: var(--color-grey-700);
  font-size: 1.4rem;
  font-weight: 600;
  text-decoration: none;
  border: 1px solid var(--color-grey-200);

  &:hover {
    background-color: var(--color-grey-200);
  }
`;

const Summary = styled.p`
  font-size: 1.5rem;
  line-height: 1.5;
  color: var(--color-grey-700);
`;

const RecentList = styled.div`
  margin-top: 1.6rem;
  display: grid;
  gap: 1.2rem;
`;

const RecentItem = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1.2rem;
  padding: 1.2rem 1.4rem;
  border: 1px solid var(--color-grey-200);
  border-radius: var(--border-radius-md);
  background: var(--color-grey-50);
`;

const RecentMain = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  min-width: 0;
`;

const RecentTitle = styled.div`
  font-weight: 700;
  color: var(--color-grey-800);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const RecentMeta = styled.div`
  font-size: 1.3rem;
  color: var(--color-grey-600);
`;

function Dashboard() {
  const {
    data: bookings,
    isLoading: bookingsLoading,
    isError: bookingsError,
    error: bookingsErrorObj,
  } = useQuery({ queryKey: ["bookings"], queryFn: getBookings });

  const {
    data: cabins,
    isLoading: cabinsLoading,
    isError: cabinsError,
    error: cabinsErrorObj,
  } = useQuery({ queryKey: ["cabins"], queryFn: getCabins });

  const {
    data: settings,
    isLoading: settingsLoading,
    isError: settingsError,
    error: settingsErrorObj,
  } = useQuery({ queryKey: ["setting"], queryFn: getSettings });

  const isLoading = bookingsLoading || cabinsLoading || settingsLoading;
  const isError = bookingsError || cabinsError || settingsError;

  const totalBookings = bookings?.length ?? 0;
  const totalCabins = cabins?.length ?? 0;
  const totalGuests = bookings?.reduce((sum, booking) => sum + (Number(booking.guestCount || booking.guests?.length || 0) || 0), 0) ?? 0;
  const revenue = bookings?.reduce((sum, booking) => {
    const regular = Number(booking.totalPrice || booking.price || 0);
    const extras = Number(booking.extrasPrice || 0);
    return sum + regular + extras;
  }, 0);

  const minimumNights = settings?.minBookingLength ?? "N/A";
  const maximumNights = settings?.maxBookingLength ?? "N/A";

  const recentBookings = (bookings ?? []).slice(0, 5);
  const fmt = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" });

  if (isLoading) {
    return <Heading as="h2">Loading dashboard…</Heading>;
  }

  if (isError) {
    return (
      <Heading as="h2">
        Failed to load dashboard: {(bookingsErrorObj || cabinsErrorObj || settingsErrorObj)?.message || "Unknown error"}
      </Heading>
    );
  }

  return (
    <>
      <PageHeader
        title="Dashboard"
        subtitle="Quick view of capacity and performance"
        actions={
          <QuickLinks>
            <QuickLink to="/bookings">View bookings</QuickLink>
            <QuickLink to="/cabins">View cabins</QuickLink>
            <QuickLink to="/users">Manage users</QuickLink>
          </QuickLinks>
        }
      />

      <StatGrid>
        <Stat title="Total Cabins" value={totalCabins} color="blue" icon={<span>🏠</span>} />
        <Stat title="Total Bookings" value={totalBookings} color="green" icon={<span>📅</span>} />
        <Stat title="Total Guests" value={totalGuests} color="purple" icon={<span>🧑‍🤝‍🧑</span>} />
        <Stat title="Estimated Revenue" value={`$${revenue.toLocaleString()}`} color="orange" icon={<span>💰</span>} />
      </StatGrid>

      <Section>
        <DashboardBox>
          <Heading as="h2">How to use the app</Heading>
          <Summary>
            Use the sidebar to manage data. Add new cabins in Cabins, create bookings in Bookings, and keep your policies in Settings.
            This page provides a quick view of your capacity and performance.
          </Summary>

          <Summary>
            Minimum stay: {minimumNights} nights; Maximum stay: {maximumNights} nights.
          </Summary>

          <Heading as="h2" style={{ marginTop: "2rem" }}>
            Recent bookings
          </Heading>
          <RecentList>
            {recentBookings.map((booking) => {
              const guest = booking?.guests?.fullName ?? "Unknown guest";
              const cabin = booking?.cabins?.name ?? "Cabin";
              const start = booking?.startDate ? fmt.format(new Date(booking.startDate)) : "—";
              const end = booking?.endDate ? fmt.format(new Date(booking.endDate)) : "—";
              const price = Number(booking?.totalPrice ?? 0);

              return (
                <RecentItem key={booking.id ?? `${guest}-${cabin}-${start}`}>
                  <RecentMain>
                    <RecentTitle>
                      {guest} · {cabin}
                    </RecentTitle>
                    <RecentMeta>
                      {start} → {end}
                    </RecentMeta>
                  </RecentMain>
                  <RecentTitle>${price.toLocaleString()}</RecentTitle>
                </RecentItem>
              );
            })}
          </RecentList>
        </DashboardBox>
      </Section>
    </>
  );
}

export default Dashboard;

