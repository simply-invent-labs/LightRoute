import PageMeta from '../../components/PageMeta.jsx';
import CodeBlock from '../../components/CodeBlock.jsx';

export default function Api() {
  return <><PageMeta title="Room Checklist" description="Use a sample room checklist to organize everyday household essentials." path="/docs/api" />
    <p className="eyebrow">Guide / 03</p><h1>Room Checklist</h1><p className="lead">Use this sample checklist to decide what belongs in a room and where each item should be stored.</p>
    <h2><code>ROOM / Living room</code></h2><p>Begin with the items you use regularly, then choose storage that makes them easy to find and return.</p>
    <h3>Checklist details</h3><div className="table-scroll"><table><caption>Room planning details</caption><thead><tr><th scope="col">Item</th><th scope="col">Category</th><th scope="col">Essential</th><th scope="col">Description</th></tr></thead><tbody><tr><th scope="row"><code>books</code></th><td>Storage</td><td>Yes</td><td>Favorite books kept together on an accessible shelf.</td></tr><tr><th scope="row"><code>basket</code></th><td>Storage</td><td>No</td><td>A useful place for small items; example: <code>woven basket</code>.</td></tr></tbody></table></div>
    <h3>Quick checklist</h3><CodeBlock language="shell">Keep favorite books together; place blankets in a basket; clear the coffee table.</CodeBlock>
    <h3>Sample room plan</h3><CodeBlock language="json">{'{\n  "room": "Living room",\n  "items": ["Books", "Blankets", "Games"],\n  "storage": "Shelf and baskets",\n  "ready": true\n}'}</CodeBlock>
    <div className="callout"><strong>Everyday habit</strong><p>Take a few minutes at the end of the day to return items to their usual places.</p></div>
  </>;
}