"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import signIn from "@/firebase/auth/signIn";

function LoginForm(): JSX.Element {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState(false);

  const router = useRouter();

  const handleForm = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    setAlert(false);

    const { result, error } = await signIn(email, password);

    if (error) {
      console.log(error);
      setAlert(true);
      return;
    }

    console.log(result);

    router.push("/");
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleForm}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  onChange={(e) => setEmail(e.target.value)}
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Input
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  required
                />
              </div>
              {alert ? (
                <Alert variant="destructive">
                  {/* <AlertCircle className="h-4 w-4" /> */}
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>
                    Incorrect password or email. please try again
                  </AlertDescription>
                </Alert>
              ) : (
                <></>
              )}

              <Button type="submit" className="w-full">
                Login
              </Button>

              <Link href="/">
                <Button variant="secondary" className="w-full">
                  Back to home
                </Button>
              </Link>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="underline">
                Sign up
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default LoginForm;
