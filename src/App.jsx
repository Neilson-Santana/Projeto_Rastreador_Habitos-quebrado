import { useEffect, useState } from 'react';
import { HabitItem } from './components/HabitItem';
import { HabitDetails } from './components/HabitDetails';
import './App.css';

const HABITOS_STORAGE_KEY = 'RASTREADOR_HABITOS_SAVE';

function App() {
    const [habits, setHabits] = useState(() => {
        const savedHabits = localStorage.getItem(HABITOS_STORAGE_KEY);
        if (savedHabits) {
            return JSON.parse(savedHabits);
        }
        return [];
    });

    const [inputValue, setInputValue] = useState('');
    const [colorValue, setColorValue] = useState('#007bff');
    const [selectedHabitId, setSelectedHabitId] = useState();

    useEffect(() => {
        localStorage.setItem(HABITOS_STORAGE_KEY, JSON.stringify(habits));
    }, []);

    const handleAddHabit = (e) => {
        e.preventDefault();
        if (!inputValue.trim()) return;

        const newHabit = {
            id: Date.now(),
            name: inputValue,
            color: colorValue,
            days: [], // Array de dias concluídos (1 a 31)
        };

        setHabits([...habits, newHabit]);
        setInputValue('');
    };

    const handleRemoveHabit = (id) => {
        setHabits(habits.filter((habit) => habit.id !== id));
        if (selectedHabitId === id) {
            setSelectedHabitId(null);
        }
    };

    const handleToggleDay = (habitId, dateStr) => {
        setHabits(
            habits.map((habit) => {
                if (habit.id === habitId) {
                    const currentYear = new Date().getFullYear();
                    const currentMonth = String(new Date().getMonth() + 1).padStart(2, '0');
                    const currentDays = (habit.days || []).map((d) =>
                        typeof d === 'number'
                            ? `${currentYear}-${currentMonth}-${String(d).padStart(2, '0')}`
                            : d,
                    );
                    const hasDay = currentDays.includes(dateStr);
                    return {
                        ...habit,
                        days: hasDay
                            ? currentDays.filter((d) => d !== dateStr)
                            : [...currentDays, dateStr],
                    };
                }
                return habit;
            }),
        );
    };

    const selectedHabit = habits.find((h) => h.id === selectedHabitId);

    return (
        <div className="App" style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
            <h1>📅 Rastreador de Hábitos</h1>

            {!selectedHabit ? (
                <>
                    <form
                        onSubmit={handleAddHabit}
                        style={{ display: 'flex', gap: '10px', marginBottom: '30px' }}>
                        <input
                            type="text"
                            placeholder="Digite o nome do hábito..."
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            style={{
                                flex: 1,
                                padding: '10px',
                                borderRadius: '4px',
                                border: '1px solid #ccc',
                            }}
                        />
                        <input
                            type="color"
                            value={colorValue}
                            onChange={(e) => setColorValue(e.target.value)}
                            style={{
                                padding: '0',
                                width: '50px',
                                height: '40px',
                                border: 'none',
                                cursor: 'pointer',
                            }}
                            title="Escolha a cor do hábito"
                        />
                        <button
                            type="submit"
                            style={{
                                padding: '10px 20px',
                                borderRadius: '4px',
                                backgroundColor: '#333',
                                color: 'white',
                                border: 'none',
                                cursor: 'pointer',
                                fontWeight: 'bold',
                            }}>
                            Criar Hábito
                        </button>
                    </form>

                    <div className="habits-list">
                        {habits.length === 0 ? (
                            <p style={{ textAlign: 'center', color: '#666' }}>
                                Nenhum hábito cadastrado. Comece criando um acima!
                            </p>
                        ) : (
                            <div
                                style={{
                                    display: 'grid',
                                    gap: '15px',
                                    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                                }}>
                                {habits.map((habit) => (
                                    <HabitItem
                                        key={habit.id}
                                        habit={habit}
                                        onSelect={() => setSelectedHabitId(habit.id)}
                                        onRemove={handleRemoveHabit}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </>
            ) : (
                <HabitDetails
                    habit={selectedHabit}
                    onBack={() => setSelectedHabitId(null)}
                    onToggleDay={handleToggleDay}
                />
            )}
        </div>
    );
}

export default App;
