export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const time = date.toLocaleString('ch-FR', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });

  const options:any = { year: 'numeric', month: 'short', day: 'numeric'};

  return `${date.toLocaleDateString('en-GB', options)} at ${time}`;
};
