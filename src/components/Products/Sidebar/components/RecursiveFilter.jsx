export const RecursiveFilter = ({
  node,
  level = 0,
  activeNode,
  setActiveNode,
  selectedItem,
  setSelectedItem,
}) => {
  const isActive = activeNode === node.id;

  return (
    <div style={{ marginLeft: level * 10 }}>
      {/* NODE HEADER */}
      <button
        onClick={() =>
          setActiveNode(isActive ? null : node.id)
        }
        className="w-full flex justify-between py-2 text-left font-medium"
      >
        {node.name}
        {node.children?.length > 0 && (
          <span>{isActive ? "−" : "+"}</span>
        )}
      </button>

      {/* CHILDREN */}
      {isActive && node.children?.length > 0 && (
        <div className="ml-3">
          {node.children.map((child) => (
            <RecursiveFilter
              key={child.id}
              node={child}
              level={level + 1}
              activeNode={activeNode}
              setActiveNode={setActiveNode}
              selectedItem={selectedItem}
              setSelectedItem={setSelectedItem}
            />
          ))}
        </div>
      )}

      {/* LEAF NODE (checkbox) */}
      {(!node.children || node.children.length === 0) && (
        <label className="flex items-center gap-2 ml-3">
          <input
            type="checkbox"
            checked={selectedItem === node.id}
            onChange={() => setSelectedItem(node.id)}
          />
          {node.name}
        </label>
      )}
    </div>
  );
};