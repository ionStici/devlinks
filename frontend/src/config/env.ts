import * as z from 'zod';

const createEnv = () => {
  const EnvSchema = z.object({
    API_URL: z.string(),
  });

  const envVars = Object.entries(import.meta.env).reduce<
    Record<string, string>
  >((acc, current) => {
    const [key, value] = current;
    if (key.startsWith('VITE_APP_')) {
      acc[key.replace('VITE_APP_', '')] = value;
    }
    return acc;
  }, {});

  const parsedEnv = EnvSchema.safeParse(envVars);

  if (!parsedEnv.success) {
    throw new Error(
      `Invalid env provided. The following variables are missing or invalid: 
      ${Object.entries(parsedEnv.error.flatten().fieldErrors)
        .map(([k, v]) => `- ${k}: ${v}`)
        .join('\n')}`
    );
  }

  return envVars;
};

export const env = createEnv();
