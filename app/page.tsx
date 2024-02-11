export default function Page() {
  async function action(data: FormData) {
    "use server";

    console.log("name: ", data.get("name"));
  }

  return (
    <>
      <h1>Hello, Next.js!</h1>
      <form action={action}>
        <label>
          name: <input type="text"  name="name"/>
        </label>
        <button>submit</button>
      </form>
    </>
  );
}
