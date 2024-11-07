import Airtable from 'airtable';

interface UserData {
  email: string;
  name: string;
  niche: string;
  description: string;
  targetAudience: string;
  contentGoals: string;
  uniqueValue: string;
}

// Initialize Airtable
const airtable = new Airtable({
  apiKey: 'patHrc9AwRfCk7IaG.cd5f72ca442005a3e9ae0709d63af1c7ba65c2d3dcc84775a29ec2a76ba77693'
});

const BASE_ID = 'appopCKipbv3x1l1s';
const TABLE_NAME = 'Content Calendar Leads';

export async function saveEmail(data: UserData): Promise<void> {
  try {
    if (!data.email?.trim() || !data.name?.trim()) {
      throw new Error('Email and name are required fields');
    }

    const base = airtable.base(BASE_ID);
    
    // Create the record
    const record = await base(TABLE_NAME).create([
      {
        fields: {
          'Email': data.email.trim(),
          'Full Name': data.name.trim(),
          'Niche': data.niche.trim(),
          'Business Description': data.description || '',
          'Target Audience': data.targetAudience || '',
          'Content Goals': data.contentGoals || '',
          'Unique Value': data.uniqueValue || '',
          'Submission Date': new Date().toISOString()
        }
      }
    ]);

    if (!record || record.length === 0) {
      throw new Error('Failed to create record');
    }

    console.log('Successfully created record:', record[0].id);
    return;

  } catch (error) {
    console.error('Error creating record:', error);
    throw error;
  }
}