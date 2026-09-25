export function HabitItem({ habit, onSelect, onRemove }) {
  const completedCount = habit.days ? habit.days.length : 0;
  
  return (
    <div 
      className="habit-item" 
      style={{ 
        padding: '15px',
        backgroundColor: '#fff',
        border: '1px solid #ddd',
        borderRadius: '8px',
        borderLeft: `8px solid ${habit.color}`,
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <h3 style={{ margin: 0, fontSize: '1.2rem', color: '#333' }}>{habit.name}</h3>
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onRemove(habit.id);
          }}
          style={{
            backgroundColor: 'transparent',
            color: '#ff4d4d',
            border: 'none',
            cursor: 'pointer',
            fontSize: '1.2rem',
            padding: '0 5px'
          }}
          title="Remover Hábito"
        >
          &times;
        </button>
      </div>
      
      <p style={{ margin: 0, color: '#666', fontSize: '0.9rem' }}>
        {completedCount} {completedCount === 1 ? 'dia concluído' : 'dias concluídos'}
      </p>

      <button 
        onClick={onSelect}
        style={{
          marginTop: '10px',
          padding: '8px',
          backgroundColor: '#f4f4f4',
          border: '1px solid #ddd',
          borderRadius: '4px',
          cursor: 'pointer',
          fontWeight: 'bold',
          color: '#333'
        }}
      >
        Ver Detalhes
      </button>
    </div>
  );
}

