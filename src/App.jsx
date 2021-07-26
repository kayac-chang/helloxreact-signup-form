import React from "react";

function clsx(...className) {
  return className.filter(Boolean).join(" ");
}

function Card({ children, className }) {
  return (
    <div className={clsx("p-4 rounded-lg shadow", className)}>{children}</div>
  );
}

function Button({ children, className }) {
  return (
    <button className={clsx("p-4 rounded-lg shadow-solid w-full", className)}>
      {children}
    </button>
  );
}

function Input({ id, label, type = "text" }) {
  return (
    <div className="relative flex justify-start items-center">
      <input
        type={type}
        id={id}
        className="w-full p-4 border rounded-lg peer"
      />

      <label
        htmlFor={id}
        className={clsx(
          "absolute p-4",
          "text-sm text-blue-dark font-semibold",
          "opacity-75 peer-focus:opacity-0"
        )}
      >
        {label}
      </label>
    </div>
  );
}

function App() {
  return (
    <div className="min-h-screen px-6 py-20 grid lg:grid-cols-2 place-content-center gap-16 max-w-screen-xl mx-auto">
      <section className="text-white my-auto text-center lg:text-left space-y-4">
        <h1 className="text-2.5xl font-bold">
          Learn to code by watching others
        </h1>

        <p className="text-base">
          See how experienced developers solve problems in real-time. Watching
          scripted tutorials is great, but understanding how developers think is
          invaluable.
        </p>
      </section>

      <section className="space-y-4">
        <Card className="bg-blue">
          <p className="text-white text-center px-12">
            <b>Try it free 7 days</b> then $20/mo. thereafter
          </p>
        </Card>

        <Card className="bg-white">
          <form className="space-y-4">
            <Input id="first-name" label="First Name" />
            <Input id="last-name" label="Last Name" />
            <Input id="email-address" label="Email Address" />
            <Input id="password" label="Password" type="password" />

            <Button className="bg-green text-white">
              CLAIM YOUR FREE TRIAL
            </Button>

            <p className="text-xs text-blue-grayish text-center px-4">
              By clicking the button, you are agreeing to our{" "}
              <a href="#" className="text-red font-bold">
                Terms and Services
              </a>
            </p>
          </form>
        </Card>
      </section>
    </div>
  );
}

export default App;
