import React from "react";

export const ThemeTest: React.FC = () => {
  return (<>
    <div className="container py-4">
      <h1 className="mb-3">Theme Test</h1>

      <section className="mb-4">
        <h2>Standard Buttons</h2>
        <div className="d-flex flex-wrap gap-2">
          <button className="btn btn-primary">Primary</button>
          <button className="btn btn-secondary">Secondary</button>
          <button className="btn btn-success">Success</button>
          <button className="btn btn-danger">Danger</button>
          <button className="btn btn-info">Info</button>
        </div>
      </section>

      <section className="mb-4">
        <h2>Custom Buttons (with hover/focus states)</h2>
        <div className="d-flex flex-wrap gap-2">
          <button className="btn btn-accent">Accent</button>
          <button className="btn btn-accent-secondary">Accent Secondary</button>
          <button className="btn btn-accent-tertiary">Accent Tertiary</button>
          <button className="btn btn-surface-elevated">Surface Elevated</button>
          <button className="btn btn-surface-accent">Surface Accent</button>
          <button className="btn btn-sidebar">Sidebar</button>
        </div>
      </section>

      <section className="mb-4">
        <h2>Text Utilities</h2>
        <p className="text-accent">Accent text</p>
        <p className="text-accent-secondary">Accent secondary text</p>
        <p className="text-accent-tertiary">Accent tertiary text</p>
        <p className="text-surface-elevated">Surface elevated text</p>
        <p className="text-sidebar">Sidebar text</p>
      </section>

      <section>
        <h2>Background Utilities</h2>
        <div className="p-3 mb-2 bg-surface-elevated">Surface Elevated</div>
        <div className="p-3 mb-2 bg-surface-tinted">Surface Tinted</div>
        <div className="p-3 mb-2 bg-surface-accent">Surface Accent</div>
        <div className="p-3 mb-2 bg-sidebar text-sidebar-primary">
          Sidebar Background
        </div>
      </section>
    </div>
    <div className="container py-4">
      <h1 className="text-primary">Primary Heading</h1>
      <p className="text-secondary">Secondary text</p>
      <p className="text-muted">Muted text</p>
      <p className="text-accent">Accent text</p>
      <p className="text-danger">Danger text</p>
      <p className="text-info">Info text</p>
      <p className="text-success">Success text</p>

      <hr />

      <div className="mb-3 d-flex flex-wrap gap-2">
        <button className="btn btn-primary">Primary</button>
        <button className="btn btn-secondary">Secondary</button>
        <button className="btn btn-accent">Accent</button>
        <button className="btn btn-danger">Danger</button>
        <button className="btn btn-info">Info</button>
        <button className="btn btn-success">Success</button>
      </div>

      <hr />

      <div className="p-3 mb-2 bg-surface-elevated">Surface Elevated</div>
      <div className="p-3 mb-2 bg-surface-tinted">Surface Tinted</div>
      <div className="p-3 mb-2 bg-surface-accent">Surface Accent</div>

      <hr />

      <aside className="p-3 mb-2 bg-sidebar text-sidebar-primary">
        Sidebar background with primary text
      </aside>
      <aside className="p-3 bg-sidebar-accent text-sidebar-accent-contrast">
        Sidebar accent background with contrast text
      </aside>
    </div>
    </>
  );
};
