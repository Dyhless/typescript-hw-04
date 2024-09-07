import React, { useState } from 'react';

export function FormComponent() {
  const [value, setValue] = useState<string>("");

  // Додаємо тип для event
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return <input type="text" value={value} onChange={handleChange} />;
}
