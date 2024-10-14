import {Group, Select} from '@mantine/core';

interface ExpirationDateInput {
  month: string | null;
  year: string | null;
  setFieldValue: (field: string, value: string | null) => void
}

const ExpirationDateInput = ({month, year, setFieldValue}: ExpirationDateInput) => {
  const currentYear = new Date().getFullYear();
  const years = Array.from({length: 12}, (_, i) => (currentYear + i).toString());
  const months = Array.from({length: 12}, (_, i) => ({
    value: (i + 1).toString().padStart(2, '0'),
    label: (i + 1).toString().padStart(2, '0')
  }));

  return (
    <Group gap={10} align={"flex-end"}>
      <Select
        name={"expirationDate.month"}
        label={"Expiration"}
        w={100}
        styles={{
          input: {
            borderLeft: "none",
            borderRight: "none",
            borderTop: "none"
          }
        }}
        radius={0}
        placeholder="Mois"
        value={month}
        onChange={(e) => setFieldValue("expirationDate.month", e)}
        data={months}
        required
      />
      <Select
        name={"expirationDate.year"}
        w={100}
        styles={{
          input: {
            borderLeft: "none",
            borderRight: "none",
            borderTop: "none"
          }
        }}
        radius={0}
        placeholder="Année"
        value={year}
        onChange={(e) => setFieldValue("expirationDate.year", e)}
        data={years}
        required
      />
    </Group>
  );
};

export default ExpirationDateInput;