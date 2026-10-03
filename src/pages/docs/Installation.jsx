import PageMeta from '../../components/PageMeta.jsx';
import CodeBlock from '../../components/CodeBlock.jsx';

export default function Installation() {
  return <><PageMeta title="Setting Up" description="Prepare a useful, comfortable space with simple storage and a clear plan." path="/docs/installation" />
    <p className="eyebrow">Guide / 02</p><h1>Setting Up</h1><p className="lead">Arrange your space around the activities you enjoy and the items you use most often.</p>
    <h2>Prepare the space</h2><p>Begin by clearing a small surface and gathering a few simple supplies:</p><CodeBlock language="shell">{'Clear one surface\nGather baskets and labels'}</CodeBlock>
    <p>Before putting items away:</p><CodeBlock language="shell">Wipe shelves and measure the available space</CodeBlock>
    <h2>Storage plan</h2><p>A short plan can help you group similar items and choose a home for each category. Adapt this example to your room.</p><CodeBlock language="json">{'{\n  "room": "Living room",\n  "groups": ["Books", "Blankets", "Games"],\n  "storage": "Shelf and baskets"\n}'}</CodeBlock>
    <div className="callout warning"><strong>Note</strong><p>Keep a simple list of storage locations in a note called <code>My room plan</code>.</p></div>
    <h2>A simple routine</h2><figure><img className="diagram" src="/images/architecture.svg" alt="A cluttered shelf is sorted into groups and arranged for everyday use" /><figcaption>Clear the space, group similar items, and arrange what you use.</figcaption></figure>
  </>;
}