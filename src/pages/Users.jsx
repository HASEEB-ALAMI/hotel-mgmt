import { useState } from "react";
import styled from "styled-components";
import Button from "../ui/Button";
import Input from "../ui/Input";
import Row from "../ui/Row";
import Form from "../ui/Form";
import FormRow from "../ui/FormRow";
import PageHeader from "../ui/PageHeader";

const UserTable = styled.div`
  border: 1px solid var(--color-grey-200);
  border-radius: 10px;
  overflow: hidden;
  margin-top: 2rem;

  @media (max-width: 700px) {
    border: none;
    overflow: visible;
  }
`;

const UserHeader = styled.div`
  background: var(--color-grey-100);
  padding: 1rem 1.2rem;
  font-weight: 700;
  display: grid;
  grid-template-columns: 2fr 3fr 2fr 1fr;
  gap: 0.8rem;

  @media (max-width: 700px) {
    display: none;
  }
`;

const UserRow = styled.div`
  display: grid;
  grid-template-columns: 2fr 3fr 2fr 1fr;
  gap: 0.8rem;
  padding: 0.9rem 1.2rem;
  border-top: 1px solid var(--color-grey-200);
  min-width: 0;

  @media (max-width: 700px) {
    grid-template-columns: 1fr;
    gap: 0.6rem;
    padding: 1.2rem;
    border: 1px solid var(--color-grey-200);
    border-radius: 12px;
    background: var(--color-grey-0);
    box-shadow: var(--shadow-sm);

    & + & {
      margin-top: 1rem;
    }
  }
`;

const Cell = styled.div`
  min-width: 0;
  overflow-wrap: anywhere;

  @media (max-width: 700px) {
    display: flex;
    justify-content: space-between;
    gap: 1.2rem;

    &::before {
      content: attr(data-label);
      font-weight: 700;
      color: var(--color-grey-500);
      flex: 0 0 auto;
    }
  }
`;

const ActionCell = styled(Cell)`
  @media (max-width: 700px) {
    justify-content: flex-start;
  }
`;

const Tag = styled.span`
  display: inline-block;
  border-radius: 999px;
  padding: 0.2rem 0.7rem;
  font-size: 1.2rem;
  background: ${(props) => (props.role === "admin" ? "#c7d2fe" : "#d1fae5")};
  color: ${(props) => (props.role === "admin" ? "#3730a3" : "#065f46")};
`;

const initialUsers = [
  { id: 1, fullName: "Aya Johnson", email: "aya@hotel.com", role: "admin" },
  { id: 2, fullName: "Marco Silva", email: "marco@hotel.com", role: "staff" },
  { id: 3, fullName: "Sam Wilder", email: "sam@hotel.com", role: "guest" },
  { id: 4, fullName: "Fatima Khan", email: "fatima@hotel.com", role: "staff" },
  { id: 5, fullName: "John Doe", email: "john@hotel.com", role: "guest" },
];

function Users() {
  const [users, setUsers] = useState(initialUsers);
  const [form, setForm] = useState({ fullName: "", email: "", role: "guest" });

  const onSubmit = (event) => {
    event.preventDefault();
    if (!form.fullName || !form.email) return;

    const newUser = {
      id: Date.now(),
      fullName: form.fullName,
      email: form.email,
      role: form.role,
    };

    setUsers((prev) => [newUser, ...prev]);
    setForm({ fullName: "", email: "", role: "guest" });
  };

  return (
    <>
      <PageHeader title="Users" subtitle="Manage staff and guests" />

      <Form onSubmit={onSubmit}>
        <Row
          type="horizontal"
          style={{ alignItems: "flex-end", gap: "1.6rem", flexWrap: "wrap" }}
        >
          <FormRow label="Full name" orientation="vertical">
            <Input
              value={form.fullName}
              onChange={(e) => setForm((prev) => ({ ...prev, fullName: e.target.value }))}
              placeholder="e.g. Lina Gomez"
            />
          </FormRow>

          <FormRow label="Email" orientation="vertical">
            <Input
              type="email"
              value={form.email}
              onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
              placeholder="e.g. lina@hotel.com"
            />
          </FormRow>

          <FormRow label="Role" orientation="vertical">
            <Input
              value={form.role}
              onChange={(e) => setForm((prev) => ({ ...prev, role: e.target.value }))}
              placeholder="admin / staff / guest"
            />
          </FormRow>

          <Button type="submit" variation="primary">
            Add User
          </Button>
        </Row>
      </Form>

      <UserTable>
        <UserHeader>
          <div>Name</div>
          <div>Email</div>
          <div>Role</div>
          <div>Actions</div>
        </UserHeader>
        {users.map((user) => (
          <UserRow key={user.id}>
            <Cell data-label="Name">{user.fullName}</Cell>
            <Cell data-label="Email">{user.email}</Cell>
            <Cell data-label="Role">
              <Tag role={user.role}>{user.role}</Tag>
            </Cell>
            <ActionCell data-label="Actions">
              <Button
                variation="secondary"
                onClick={() => setUsers((prev) => prev.filter((u) => u.id !== user.id))}
              >
                Remove
              </Button>
            </ActionCell>
          </UserRow>
        ))}
      </UserTable>
    </>
  );
}

export default Users;

