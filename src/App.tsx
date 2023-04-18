import * as React from "react";
import { ChessGame } from "components";

interface AppProps {}

const App: React.FC<AppProps> = () => {
  return (
      <ChessGame />
  );
};

export default App;
