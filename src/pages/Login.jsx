import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Heading from "../ui/Heading";
import Form from "../ui/Form";
import FormRow from "../ui/FormRow";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import { authenticateDemo, getDemoAccounts } from "../utils/demoAuthStore";

const LoginLayout = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: minmax(0, 48rem);
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  background-color: var(--color-grey-50);
  padding: 2.4rem 1.6rem;
`;

const DemoCard = styled.div`
  background: var(--color-grey-0);
  border: 1px solid var(--color-grey-200);
  border-radius: 12px;
  padding: 1.6rem;
`;

const DemoList = styled.div`
  margin-top: 1.2rem;
  display: grid;
  gap: 0.8rem;
`;

const DemoRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1.2rem;
  padding: 0.8rem 1rem;
  border-radius: 10px;
  background: var(--color-grey-50);
  border: 1px solid var(--color-grey-200);
  font-size: 1.4rem;
  min-width: 0;

  & > span {
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: flex-start;
    & > span {
      white-space: normal;
    }
  }
`;

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const demoAccounts = getDemoAccounts();

  function quickLogin() {
    const acct = demoAccounts[0];
    login({
      id: acct.id,
      fullName: acct.fullName,
      email: acct.email,
      role: acct.role,
    });
    toast.success(`Welcome, ${acct.fullName}`);
    navigate("/dashboard", { replace: true });
  }

  function onSubmit(e) {
    e.preventDefault();

    const acct = authenticateDemo(form.email, form.password);

    if (!acct) {
      toast.error("Invalid demo credentials");
      return;
    }

    login({ id: acct.id, fullName: acct.fullName, email: acct.email, role: acct.role });
    toast.success(`Welcome, ${acct.fullName}`);
    navigate("/dashboard", { replace: true });
  }

  return (
    <LoginLayout>
      <div style={{ textAlign: "center" }}>
        <img
          src="/taj-logo.png"
          alt="Taj Hotel"
          style={{ height: "7rem", borderRadius: "16px" }}
        />
        <Heading as="h1" style={{ marginTop: "1rem" }}>
          Sign in
        </Heading>
        <p style={{ color: "var(--color-grey-600)", marginTop: "0.4rem" }}>
          Demo login for the dashboard
        </p>
        <div style={{ marginTop: "1.2rem" }}>
          <Button variation="secondary" type="button" onClick={quickLogin}>
            Continue as admin
          </Button>
        </div>
      </div>

      <Form onSubmit={onSubmit}>
        <FormRow label="Email">
          <Input
            type="email"
            value={form.email}
            onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
            placeholder="admin@hotel.com"
          />
        </FormRow>

        <FormRow label="Password">
          <Input
            type="password"
            value={form.password}
            onChange={(e) => setForm((prev) => ({ ...prev, password: e.target.value }))}
            placeholder="admin123"
          />
        </FormRow>

        <FormRow>
          <Button type="submit" size="large">
            Sign in
          </Button>
        </FormRow>
      </Form>

      <DemoCard>
        <Heading as="h2">Demo accounts</Heading>
        <DemoList>
          {demoAccounts.map((acct) => (
            <DemoRow key={acct.id}>
              <span style={{ fontWeight: 700 }}>{acct.email}</span>
              <span style={{ color: "var(--color-grey-600)" }}>{acct.password}</span>
              <span style={{ fontWeight: 700, color: "var(--color-grey-700)" }}>{acct.role}</span>
            </DemoRow>
          ))}
        </DemoList>
      </DemoCard>
    </LoginLayout>
  );
}

export default Login;
