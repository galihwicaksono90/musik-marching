import { Button } from "@repo/ui/components/ui/button";
import { Input } from "@repo/ui/components/ui/input";

export default function Home() {
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <h1>hello world</h1>
      <Button variant="outline">hello</Button>
      <Input />
    </div>
  );
}
