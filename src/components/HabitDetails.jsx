import { useState } from 'react';
export function HabitDetails({ habit, onBack, onToggleDay }) {
    const currentYear = new Date().getFullYear();
    const currentMonthIndex = new Date().getMonth(); // 0 a 11

    // Nomes dos meses em PT-BR
    const monthNames = [
        'Janeiro',
        'Fevereiro',
        'Março',
        'Abril',
        'Maio',
        'Junho',
        'Julho',
        'Agosto',
        'Setembro',
        'Outubro',
        'Novembro',
        'Dezembro',
    ];

    // Organizar a ordem dos meses: O mês atual vem primeiro, depois os outros na ordem natural
    const allMonths = Array.from({ length: 12 }, (_, i) => i);
    const reorderedMonths = [
        currentMonthIndex,
        ...allMonths.filter((m) => m !== currentMonthIndex),
    ];

    // Helper para formatar a data como YYYY-MM-DD
    const formatDate = (year, monthIndex, day) => {
        const mm = String(monthIndex + 1).padStart(2, '0');
        const dd = String(day).padStart(2, '0');
        return `${year}-${mm}-${dd}`;
    };

    // Helper para pegar o total de dias no mês
    const getDaysInMonth = (year, monthIndex) => {
        return new Date(year, monthIndex + 1, 0).getDate();
    };

    // Garante que dias gravados antigamente como numero (legado) fiquem como string
    const normalizedDays = (habit.days || []).map((d) =>
        typeof d === 'number' ? formatDate(currentYear, currentMonthIndex, d) : d,
    );

    return (
        <div
            className="habit-details"
            style={{
                backgroundColor: '#fff',
                padding: '20px',
                borderRadius: '8px',
                boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
            }}>
            <button
                onClick={onBack}
                style={{
                    marginBottom: '20px',
                    padding: '8px 15px',
                    backgroundColor: '#eee',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                }}>
                &larr; Voltar para a lista
            </button>

            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '15px',
                    marginBottom: '20px',
                }}>
                <div
                    style={{
                        width: '24px',
                        height: '24px',
                        backgroundColor: habit.color,
                        borderRadius: '50%',
                    }}></div>
                <h2 style={{ margin: 0, color: '#333' }}>
                    {habit.name} - {currentYear}
                </h2>
            </div>

            <p style={{ color: '#666', marginBottom: '30px' }}>
                Marque os dias que você completou o hábito. O mês atual está no topo!
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
                {reorderedMonths.map((monthIndex) => {
                    const daysInMonth = getDaysInMonth(currentYear, monthIndex);
                    const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

                    return (
                        <div
                            key={monthIndex}
                            style={{
                                border: '1px solid #eaeaea',
                                padding: '15px',
                                borderRadius: '8px',
                            }}>
                            <h3
                                style={{
                                    marginTop: 0,
                                    color: '#444',
                                    borderBottom: '2px solid #eaeaea',
                                    paddingBottom: '10px',
                                }}>
                                {monthNames[monthIndex]}{' '}
                                {monthIndex === currentMonthIndex ? '(Mês Atual)' : ''}
                            </h3>

                            <div
                                style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(auto-fill, minmax(40px, 1fr))',
                                    gap: '8px',
                                    marginTop: '15px',
                                }}>
                                {daysArray.map((day) => {
                                    const dateStr = formatDate(currentYear, monthIndex, day);
                                    const isCompleted = normalizedDays.includes(dateStr);

                                    return (
                                        <div
                                            key={day}
                                            onClick={() => onToggleDay(habit.id, dateStr)}
                                            style={{
                                                aspectRatio: '1/1',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                backgroundColor: isCompleted
                                                    ? habit.color
                                                    : '#f9f9f9',
                                                color: isCompleted ? '#fff' : '#888',
                                                fontWeight: 'bold',
                                                fontSize: '0.9rem',
                                                borderRadius: '6px',
                                                cursor: 'pointer',
                                                border: isCompleted
                                                    ? `2px solid ${habit.color}`
                                                    : '1px solid #ddd',
                                                transition: 'all 0.15s ease',
                                                userSelect: 'none',
                                            }}
                                            title={dateStr}>
                                            {day}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
