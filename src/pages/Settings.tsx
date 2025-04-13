
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Download, Key, Save, UserIcon } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const Settings = () => {
  const handleSaveClick = () => {
    toast({
      title: "Settings saved",
      description: "Your settings have been updated successfully."
    });
  };
  
  return (
    <div className="container max-w-3xl animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold gradient-text mb-2">Settings</h1>
        <p className="text-muted-foreground">
          Customize your journal experience
        </p>
      </div>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserIcon className="h-5 w-5" />
            Profile Settings
          </CardTitle>
          <CardDescription>
            Update your personal information
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Display Name</Label>
              <Input id="name" defaultValue="Journal User" />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue="user@example.com" />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Key className="h-5 w-5" />
            Privacy & Security
          </CardTitle>
          <CardDescription>
            Control your privacy and security preferences
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="encryption" className="font-medium">End-to-End Encryption</Label>
              <p className="text-sm text-muted-foreground">Encrypt all your journal entries</p>
            </div>
            <Switch id="encryption" defaultChecked={true} />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="biometric" className="font-medium">Biometric Lock</Label>
              <p className="text-sm text-muted-foreground">Require authentication to access journal</p>
            </div>
            <Switch id="biometric" defaultChecked={false} />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="analytics" className="font-medium">Anonymous Analytics</Label>
              <p className="text-sm text-muted-foreground">Help us improve with anonymous usage data</p>
            </div>
            <Switch id="analytics" defaultChecked={true} />
          </div>
        </CardContent>
      </Card>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Preferences</CardTitle>
          <CardDescription>
            Customize how Journal AI Alchemy works for you
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="theme">Theme</Label>
            <Select defaultValue="system">
              <SelectTrigger id="theme">
                <SelectValue placeholder="Select theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="reminder">Journal Reminder</Label>
            <Select defaultValue="evening">
              <SelectTrigger id="reminder">
                <SelectValue placeholder="Set reminder time" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="morning">Morning (8:00 AM)</SelectItem>
                <SelectItem value="afternoon">Afternoon (3:00 PM)</SelectItem>
                <SelectItem value="evening">Evening (8:00 PM)</SelectItem>
                <SelectItem value="none">No reminders</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="ai-features" className="font-medium">AI Analysis Features</Label>
              <p className="text-sm text-muted-foreground">Enable AI-powered insights and suggestions</p>
            </div>
            <Switch id="ai-features" defaultChecked={true} />
          </div>
        </CardContent>
      </Card>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Data Management</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-medium">Export Journal Data</h3>
              <p className="text-sm text-muted-foreground">Download all your journal entries</p>
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
          </div>
          
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-medium text-destructive">Delete All Journal Data</h3>
              <p className="text-sm text-muted-foreground">This action cannot be undone</p>
            </div>
            <Button variant="destructive">Delete All</Button>
          </div>
        </CardContent>
      </Card>
      
      <div className="flex justify-end">
        <Button onClick={handleSaveClick} className="gap-2">
          <Save className="h-4 w-4" />
          Save Settings
        </Button>
      </div>
    </div>
  );
};

export default Settings;
