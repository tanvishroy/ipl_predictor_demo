import { IPLTeam, TeamCode } from '../types/ipl';

export const IPL_TEAMS: IPLTeam[] = [
  {
    code: 'CSK',
    name: 'Chennai Super Kings',
    shortName: 'Super Kings',
    city: 'Chennai',
    titles: 5,
    primaryColor: '#F9CD05', // Gold / Yellow
    secondaryColor: '#002B66', // Royal Navy Blue
    textColor: '#000000',
    gradient: 'from-amber-400 to-yellow-500',
    slogan: 'Whistle Podu!',
    established: 2008,
    captain: 'Ruturaj Gaikwad',
    venue: 'M. A. Chidambaram Stadium'
  },
  {
    code: 'RCB',
    name: 'Royal Challengers Bengaluru',
    shortName: 'Royal Challengers',
    city: 'Bengaluru',
    titles: 0,
    primaryColor: '#EC1C24', // Red
    secondaryColor: '#000000', // Black & Gold accent
    textColor: '#FFFFFF',
    gradient: 'from-red-600 to-rose-700',
    slogan: 'Play Bold!',
    established: 2008,
    captain: 'Rajat Patidar',
    venue: 'M. Chinnaswamy Stadium'
  },
  {
    code: 'MI',
    name: 'Mumbai Indians',
    shortName: 'Indians',
    city: 'Mumbai',
    titles: 5,
    primaryColor: '#004BA0', // Electric Blue
    secondaryColor: '#D4AF37', // Gold
    textColor: '#FFFFFF',
    gradient: 'from-blue-600 to-indigo-700',
    slogan: 'Duniya Hila Denge!',
    established: 2008,
    captain: 'Hardik Pandya',
    venue: 'Wankhede Stadium'
  },
  {
    code: 'RR',
    name: 'Rajasthan Royals',
    shortName: 'Royals',
    city: 'Jaipur',
    titles: 1,
    primaryColor: '#EA1A85', // Pink
    secondaryColor: '#254AA5', // Royal Blue
    textColor: '#FFFFFF',
    gradient: 'from-pink-500 to-rose-600',
    slogan: 'Halla Bol!',
    established: 2008,
    captain: 'Sanju Samson',
    venue: 'Sawai Mansingh Stadium'
  },
  {
    code: 'KKR',
    name: 'Kolkata Knight Riders',
    shortName: 'Knight Riders',
    city: 'Kolkata',
    titles: 3,
    primaryColor: '#3A225D', // Deep Purple
    secondaryColor: '#F2C94C', // Gold
    textColor: '#FFFFFF',
    gradient: 'from-purple-700 to-indigo-900',
    slogan: 'Korbo Lorbo Jeetbo!',
    established: 2008,
    captain: 'Shreyas Iyer',
    venue: 'Eden Gardens'
  },
  {
    code: 'PBKS',
    name: 'Punjab Kings',
    shortName: 'Kings',
    city: 'Mullanpur / Mohali',
    titles: 0,
    primaryColor: '#DD1D21', // Crimson Red
    secondaryColor: '#A7A9AC', // Silver
    textColor: '#FFFFFF',
    gradient: 'from-red-500 to-rose-700',
    slogan: 'Sadda Punjab!',
    established: 2008,
    captain: 'Shikhar Dhawan',
    venue: 'PCA Stadium, Mohali'
  },
  {
    code: 'SRH',
    name: 'Sunrisers Hyderabad',
    shortName: 'Sunrisers',
    city: 'Hyderabad',
    titles: 1,
    primaryColor: '#F26522', // Fiery Orange
    secondaryColor: '#000000', // Black
    textColor: '#FFFFFF',
    gradient: 'from-orange-500 to-amber-600',
    slogan: 'Orange Army!',
    established: 2012,
    captain: 'Pat Cummins',
    venue: 'Rajiv Gandhi Intl Stadium'
  },
  {
    code: 'DC',
    name: 'Delhi Capitals',
    shortName: 'Capitals',
    city: 'Delhi',
    titles: 0,
    primaryColor: '#172652', // Deep Navy
    secondaryColor: '#EF4123', // Red
    textColor: '#FFFFFF',
    gradient: 'from-blue-800 to-slate-900',
    slogan: 'Roar Macha!',
    established: 2008,
    captain: 'Rishabh Pant',
    venue: 'Arun Jaitley Stadium'
  },
  {
    code: 'LSG',
    name: 'Lucknow Super Giants',
    shortName: 'Super Giants',
    city: 'Lucknow',
    titles: 0,
    primaryColor: '#00A3E0', // Cyan Blue
    secondaryColor: '#FFC72C', // Gold
    textColor: '#FFFFFF',
    gradient: 'from-sky-500 to-blue-600',
    slogan: 'Ab Apni Baari!',
    established: 2021,
    captain: 'KL Rahul',
    venue: 'BRSABV Ekana Stadium'
  },
  {
    code: 'GT',
    name: 'Gujarat Titans',
    shortName: 'Titans',
    city: 'Ahmedabad',
    titles: 1,
    primaryColor: '#1B2133', // Deep Space Navy
    secondaryColor: '#DBA749', // Gold
    textColor: '#FFFFFF',
    gradient: 'from-slate-800 to-indigo-950',
    slogan: 'Aava De!',
    established: 2021,
    captain: 'Shubman Gill',
    venue: 'Narendra Modi Stadium'
  }
];

export const getTeamByCode = (code: string): IPLTeam | undefined => {
  if (!code) return undefined;
  const upperCode = code.trim().toUpperCase();
  return IPL_TEAMS.find(
    (team) => 
      team.code === upperCode || 
      team.name.toLowerCase() === code.toLowerCase() ||
      team.shortName.toLowerCase() === code.toLowerCase()
  );
};
