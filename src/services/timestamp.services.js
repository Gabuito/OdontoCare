export default function getTimestamp(){
  const date = new Date();
  const formatTimestamp = new Intl.DateTimeFormat('pt-BR', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false,
  timeZone: 'America/Sao_Paulo'
}).format(date);

// Converter para o formato ISO 8601
const [day, month, year, hour, minute, second] = formatTimestamp.match(/\d+/g);
const isoTimestamp = `${year}-${month}-${day}T${hour}:${minute}:${second}-03:00`;
return isoTimestamp;
}