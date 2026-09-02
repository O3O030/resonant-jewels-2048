import GemStone2048Game from './components/GemStone2048Game';

export default function App() {
  return (
    <main className="min-h-screen velvet-cushion-bg">
      <GemStone2048Game isModal={false} />
    </main>
  );
}
