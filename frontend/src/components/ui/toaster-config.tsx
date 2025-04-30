import { Toaster } from 'react-hot-toast';

export function ToasterConfig() {
  return (
    <Toaster
      position="top-center"
      toastOptions={{
        duration: 2500,
        style: {
          maxWidth: '650px',
          paddingLeft: '16px',
          borderRadius: '12px',
          background: '#333',
          color: '#fff',
          fontSize: '16px',
          fontWeight: '600',
          lineHeight: '24px',
        },
      }}
    />
  );
}
