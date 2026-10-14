export default function ColorSelector({ colors, selected, onSelect, selectable }) {
  if (!colors.length) return null;
  return (
    <div className="color-selector">
      <p className="label">
        Color: <strong>{colors[selected]?.name ?? colors[0].name}</strong>
      </p>
      {selectable ? (
        <div className="swatch-row" role="radiogroup" aria-label="Seleccionar color">
          {colors.map((c, i) => (
            <button
              key={c.name}
              type="button"
              role="radio"
              aria-checked={i === selected}
              aria-label={c.name}
              title={c.name}
              className={i === selected ? 'swatch-btn active' : 'swatch-btn'}
              style={{ background: c.hex }}
              onClick={() => onSelect(i)}
            />
          ))}
        </div>
      ) : (
        <p className="small muted">Este producto está disponible en un solo color.</p>
      )}
    </div>
  );
}
