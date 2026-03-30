import { useState } from "react";
import styled from "styled-components";
import Heading from "../ui/Heading";
import Button from "../ui/Button";
import Form from "../ui/Form";
import FormRow from "../ui/FormRow";
import Input from "../ui/Input";
import Row from "../ui/Row";
import PageHeader from "../ui/PageHeader";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import { getDemoAccounts, updateDemoAccount } from "../utils/demoAuthStore";

const Section = styled.section`
  margin-top: 1.8rem;
`;

const Card = styled.div`
  background: var(--color-grey-0);
  border: 1px solid var(--color-grey-200);
  border-radius: 12px;
  padding: 1.6rem;
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

function Account() {
  const { user, login } = useAuth();

  const [profile, setProfile] = useState({
    fullName: user?.fullName || "",
    email: user?.email || "",
    phone: user?.phone || "",
  });

  const [password, setPassword] = useState({ current: "", new: "", confirm: "" });

  function handleProfileSubmit(e) {
    e.preventDefault();

    const fullName = profile.fullName.trim();
    const email = profile.email.trim();
    const phone = profile.phone.trim();

    if (fullName.length < 2) {
      toast.error("Please enter your full name");
      return;
    }

    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!isEmailValid) {
      toast.error("Please enter a valid email");
      return;
    }

    const accounts = getDemoAccounts();
    const emailTaken = accounts.some(
      (acct) => acct.id !== user?.id && acct.email.toLowerCase() === email.toLowerCase()
    );

    if (emailTaken) {
      toast.error("This email is already used by another demo account");
      return;
    }

    const updated = updateDemoAccount(user.id, { fullName, email, phone });
    if (!updated) {
      toast.error("Could not update profile");
      return;
    }

    login({ ...user, fullName: updated.fullName, email: updated.email, phone: updated.phone });
    toast.success("Profile updated");
  }

  function handlePasswordSubmit(e) {
    e.preventDefault();

    const accounts = getDemoAccounts();
    const acct = accounts.find((a) => a.id === user?.id);

    if (!acct) {
      toast.error("Demo account not found");
      return;
    }

    if (password.current !== acct.password) {
      toast.error("Current password is incorrect");
      return;
    }

    if (password.new.length < 6) {
      toast.error("New password must be at least 6 characters");
      return;
    }

    if (password.new !== password.confirm) {
      toast.error("New password and confirmation do not match");
      return;
    }

    updateDemoAccount(user.id, { password: password.new });
    setPassword({ current: "", new: "", confirm: "" });
    toast.success("Password updated");
  }

  return (
    <>
      <PageHeader title="Account" subtitle="Update your personal information and password" />

      <Section>
        <Heading as="h2">Profile</Heading>
        <Card>
          <Form onSubmit={handleProfileSubmit}>
            <FormRow label="Full name">
              <Input
                value={profile.fullName}
                onChange={(e) =>
                  setProfile((prev) => ({ ...prev, fullName: e.target.value }))
                }
                placeholder="Your name"
              />
            </FormRow>

            <FormRow label="Email">
              <Input
                type="email"
                value={profile.email}
                onChange={(e) => setProfile((prev) => ({ ...prev, email: e.target.value }))}
                placeholder="you@example.com"
              />
            </FormRow>

            <FormRow label="Phone (optional)">
              <Input
                value={profile.phone}
                onChange={(e) => setProfile((prev) => ({ ...prev, phone: e.target.value }))}
                placeholder="+1 555 123 4567"
              />
            </FormRow>

            <Row>
              <Button type="submit">Save changes</Button>
            </Row>
          </Form>
        </Card>
      </Section>

      <Section>
        <Heading as="h2">Password</Heading>
        <Card>
          <Form onSubmit={handlePasswordSubmit}>
            <FormRow label="Current password">
              <Input
                type="password"
                value={password.current}
                onChange={(e) => setPassword((prev) => ({ ...prev, current: e.target.value }))}
                placeholder="Enter current password"
              />
            </FormRow>

            <FormRow label="New password">
              <Input
                type="password"
                value={password.new}
                onChange={(e) => setPassword((prev) => ({ ...prev, new: e.target.value }))}
                placeholder="At least 6 characters"
              />
            </FormRow>

            <FormRow label="Confirm new password">
              <Input
                type="password"
                value={password.confirm}
                onChange={(e) => setPassword((prev) => ({ ...prev, confirm: e.target.value }))}
                placeholder="Repeat new password"
              />
            </FormRow>

            <Row>
              <Button type="submit" variation="secondary">
                Update password
              </Button>
            </Row>
          </Form>
        </Card>
      </Section>
    </>
  );
}

export default Account;

