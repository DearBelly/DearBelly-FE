declare module '@storybook/types' {
    export interface Preview {
      parameters?: Record<string, any>;
      decorators?: any[];
      args?: Record<string, any>;
      globals?: Record<string, any>;
      globalTypes?: Record<string, any>;
    }
  }
  