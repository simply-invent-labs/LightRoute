import PageMeta from '../components/PageMeta.jsx';

export default function Private() {
  return <><PageMeta title="Planning Corner" description="Find sample planning ideas for organizing everyday household tasks." path="/private" />
    <p className="eyebrow">Everyday planning</p><h1>Your planning corner</h1><p>Use this sample planning corner as inspiration for keeping household tasks and room ideas in one place.</p>
    <div className="card-grid"><section className="card"><h2>Household</h2><p>A welcoming place to gather</p></section><section className="card"><h2>Weekly tasks</h2><p>Choose one small area to tidy this week.</p></section></div>
  </>;
}