import React, { useState } from 'react';
import Card from './common/Card';
import Input from './common/Input';
import Button from './common/Button';

interface LoginScreenProps {
  onLogin: (username: string, password: string) => boolean;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('alexd');
  const [password, setPassword] = useState('password');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = onLogin(username, password);
    if (!success) {
      setError('Invalid username or password.');
    } else {
      setError('');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-900 p-4">
      <Card className="w-full max-w-sm">
        <div className="p-8">
          <h1 className="text-center text-2xl font-bold text-slate-50">Subscribely</h1>
          <p className="text-center text-sm text-slate-400 mt-1">Manage your subscriptions wisely.</p>
          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <Input
              id="username"
              label="Username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoComplete="username"
            />
            <Input
              id="password"
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
            {error && <p className="text-sm text-red-500">{error}</p>}
            <div>
              <p className="text-xs text-center text-slate-500">Hint: Use username `alexd` and password `password`</p>
            </div>
            <Button type="submit" className="w-full">
              Sign In
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default LoginScreen;
