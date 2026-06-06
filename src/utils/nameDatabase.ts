// International realistic name database to generate natural, non-gibberish identities

export interface RegionNames {
  firstNames: string[];
  lastNames: string[];
}

export const REGIONS = ['Indian', 'American', 'Japanese', 'Korean', 'Arabic', 'European', 'Hollywood', 'Anime'] as const;
export type RegionType = typeof REGIONS[number];

export const NAME_DATA: Record<RegionType, RegionNames> = {
  Indian: {
    firstNames: [
      'Aarav', 'Arjun', 'Aditya', 'Vivaan', 'Kabir', 'Rohan', 'Dev', 'Sai', 'Rahul', 'Amit',
      'Priya', 'Ananya', 'Diya', 'Isha', 'Kiara', 'Meera', 'Neha', 'Riya', 'Shruti', 'Pooja',
      'Vihaan', 'Reyansh', 'Krishna', 'Ishaan', 'Shaurya', 'Aaryan', 'Dhruv', 'Kabir', 'Aanya',
      'Aadhya', 'Saanvi', 'Prisha', 'Riddhi', 'Kavya', 'Suhani', 'Tanvi', 'Anvi', 'Avani',
      'Abhishek', 'Rajesh', 'Sanjay', 'Vikram', 'Deepak', 'Alok', 'Yash', 'Varun', 'Kunal',
      'Anjali', 'Kiran', 'Deepika', 'Kareena', 'Sonam', 'Aditi', 'Shreya', 'Divya', 'Sneha', 'Nisha'
    ],
    lastNames: [
      'Sharma', 'Verma', 'Patel', 'Mehta', 'Nair', 'Joshi', 'Rao', 'Iyer', 'Gupta', 'Kapoor',
      'Reddy', 'Singh', 'Kumar', 'Sen', 'Chatterjee', 'Mukherjee', 'Banerjee', 'Bose', 'Das',
      'Prasad', 'Mishra', 'Choudhury', 'Sinha', 'Chawla', 'Bhasin', 'Malhotra', 'Aggarwal',
      'Bansal', 'Shah', 'Trivedi', 'Bhatt', 'Pillai', 'Menon', 'Shetty', 'Hegde', 'Gowda', 'Naidu'
    ]
  },
  American: {
    firstNames: [
      'Liam', 'Noah', 'Oliver', 'Elijah', 'James', 'William', 'Benjamin', 'Lucas', 'Henry', 'Mason',
      'Michael', 'Ethan', 'Daniel', 'Jacob', 'Logan', 'Jackson', 'Levi', 'Sebastian', 'Jack', 'Wyatt',
      'Olivia', 'Emma', 'Ava', 'Sophia', 'Isabella', 'Charlotte', 'Amelia', 'Mia', 'Harper', 'Evelyn',
      'Abigail', 'Emily', 'Ella', 'Elizabeth', 'Sofia', 'Avery', 'Scarlett', 'Grace', 'Chloe', 'Victoria',
      'Alexander', 'Owen', 'Luke', 'Gabriel', 'Carter', 'Julian', 'John', 'Jonathan', 'Samuel', 'David',
      'Lily', 'Hannah', 'Zoey', 'Penelope', 'Layla', 'Riley', 'Nora', 'Hazel', 'Aurora', 'Savannah'
    ],
    lastNames: [
      'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez',
      'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor',
      'Moore', 'Jackson', 'Martin', 'Lee', 'Perez', 'Thompson', 'White', 'Harris', 'Sanchez',
      'Clark', 'Ramirez', 'Lewis', 'Robinson', 'Walker', 'Young', 'Allen', 'King', 'Wright', 'Scott'
    ]
  },
  Japanese: {
    firstNames: [
      'Haruto', 'Yuto', 'Sota', 'Riku', 'Haru', 'Yuki', 'Kaito', 'Ren', 'Sora', 'Itsuki',
      'Sakura', 'Aoi', 'Himari', 'Yuna', 'Mei', 'Hina', 'Yua', 'Koharu', 'Akari', 'Sara',
      'Hiroto', 'Taiga', 'Yamato', 'Tsubasa', 'Shota', 'Ryota', 'Koki', 'Daiki', 'Kazuki',
      'Rin', 'Hana', 'Miu', 'Yuka', 'Nanami', 'Kanon', 'Aimi', 'Riko', 'Momoka', 'Kokona',
      'Minato', 'Takumi', 'Yusei', 'Ryu', 'Satoshi', 'Kenji', 'Shin', 'Keigo', 'Takeshi', 'Yoshi'
    ],
    lastNames: [
      'Sato', 'Suzuki', 'Takahashi', 'Tanaka', 'Watanabe', 'Ito', 'Yamamoto', 'Nakamura',
      'Kobayashi', 'Kato', 'Yoshida', 'Yamada', 'Sasaki', 'Yamaguchi', 'Matsumoto', 'Inoue',
      'Kimura', 'Hayashi', 'Shimizu', 'Yamazaki', 'Mori', 'Abe', 'Ikeda', 'Hashimoto', 'Yamashita',
      'Ishikawa', 'Maeda', 'Nakagawa', 'Hasegawa', 'Okada', 'Saito', 'Sakamoto', 'Ueda', 'Shibata'
    ]
  },
  Korean: {
    firstNames: [
      'Min-jun', 'Seo-jun', 'Ye-jun', 'Do-yun', 'Dong-hyun', 'Ji-hoo', 'Joon-woo', 'Hyun-woo',
      'Ji-woo', 'Seo-yeon', 'Ye-eun', 'Ha-eun', 'Ji-min', 'Min-ji', 'Eun-ji', 'Seo-hyun', 'Ji-yoon',
      'Woo-jin', 'Gun-woo', 'Sun-woo', 'Yu-jun', 'Min-jae', 'Hyun-jun', 'Jun-seo', 'Ji-hun',
      'Ji-a', 'Seo-a', 'Chae-won', 'Yoon-ah', 'Min-seo', 'Da-eun', 'Ye-rin', 'Roo-ri', 'So-yul',
      'Tae-hyun', 'Su-bin', 'Ji-hye', 'Kyung-soo', 'Min-seok', 'Baek-hyun', 'Chan-yeol', 'Se-hun'
    ],
    lastNames: [
      'Kim', 'Lee', 'Park', 'Choi', 'Jung', 'Kang', 'Cho', 'Yoon', 'Jang', 'Lim', 'Han', 'Shin',
      'Oh', 'Seo', 'Kwon', 'Hwang', 'Song', 'An', 'Hong', 'Jeon', 'Ko', 'Moon', 'Son', 'Yang',
      'Bae', 'Jo', 'Paik', 'Huh', 'Yoo', 'Nam', 'Sim', 'Ro', 'Kwang', 'Eun', 'Na', 'Min'
    ]
  },
  Arabic: {
    firstNames: [
      'Muhammad', 'Omar', 'Ali', 'Youssef', 'Ibrahim', 'Ahmed', 'Kareem', 'Zayn', 'Hamza', 'Mostafa',
      'Fatimah', 'Aisha', 'Mariam', 'Layla', 'Amira', 'Yasmin', 'Farah', 'Nour', 'Salma', 'Jana',
      'Tariq', 'Khalid', 'Rayyan', 'Bilal', 'Malik', 'Ziad', 'Yaseen', 'Hassan', 'Hussein', 'Sami',
      'Hana', 'Rania', 'Lina', 'Dina', 'Nadia', 'Reem', 'Sahar', 'Habiba', 'Zahra', 'Malak',
      'Anas', 'Mahmoud', 'Fadi', 'Rami', 'Adnan', 'Zaki', 'Raheem', 'Bassem', 'Nael', 'Waleed'
    ],
    lastNames: [
      'Al-Farsi', 'Al-Harbi', 'Mansoor', 'Khan', 'Al-Ahmadi', 'Haddad', 'Al-Masri', 'Al-Saeed',
      'Qureshi', 'Siddiqui', 'Assaf', 'Halabi', 'Khoury', 'Ghanem', 'Shahin', 'Darwish', 'Najjar',
      'Tahan', 'Hariri', 'Al-Hasan', 'Al-Sabah', 'Al-Fayez', 'Sweid', 'Al-Mansoori', 'Jabbar',
      'El-Amin', 'Wahid', 'Farooq', 'Suleiman', 'Sharif', 'Abadi', 'Tazi', 'Kanaan', 'Hijazi'
    ]
  },
  European: {
    firstNames: [
      'Lucas', 'Gabriel', 'Louis', 'Arthur', 'Leon', 'Matteo', 'Noah', 'Paul', 'Jonas', 'Maximilian',
      'Emma', 'Louise', 'Alice', 'Chloe', 'Lina', 'Sofia', 'Ella', 'Nina', 'Anna', 'Marie',
      'Alexander', 'Sebastian', 'Oliver', 'Filip', 'Lukas', 'Finn', 'Emil', 'Felix', 'Theo', 'Hugo',
      'Mia', 'Ines', 'Elena', 'Laura', 'Clara', 'Leonie', 'Amelie', 'Maja', 'Zoe', 'Lara',
      'Mathis', 'Nathan', 'Antoine', 'Guillaume', 'Pierre', 'Jean', 'Marc', 'Julien', 'Nicolas'
    ],
    lastNames: [
      'Müller', 'Schmidt', 'Schneider', 'Fischer', 'Meyer', 'Weber', 'Wagner', 'Becker', 'Schulz',
      'Petit', 'Dupont', 'Bernard', 'Dubois', 'Martin', 'Michel', 'Simon', 'Laurent', 'Lefebvre',
      'García', 'Fernández', 'López', 'Martínez', 'Sánchez', 'Pérez', 'Gómez', 'Rossi', 'Russo',
      'Ferrari', 'Esposito', 'Bianchi', 'Romano', 'Colombo', 'Ricci', 'Marino', 'Greco', 'Bruno'
    ]
  },
  Hollywood: {
    firstNames: [
      'Tony', 'Bruce', 'Clark', 'Peter', 'Steve', 'Wade', 'Logan', 'Diana', 'Barry', 'Natasha',
      'Arthur', 'John', 'Walter', 'Jesse', 'Jack', 'Indiana', 'James', 'Sherlock', 'Loki', 'Thor',
      'Dominic', 'Homelander', 'Iron', 'Bat', 'Super', 'Spider', 'Captain', 'Doctor', 'Han', 'Vito',
      'Tyler', 'Michael', 'Ellen', 'Sarah', 'Marty', 'Neo', 'Max', 'Rick', 'Lara', 'Frodo', 'Harry'
    ],
    lastNames: [
      'Stark', 'Wayne', 'Kent', 'Parker', 'Rogers', 'Wilson', 'Howlett', 'Prince', 'Allen', 'Romanoff',
      'Fleck', 'Wick', 'White', 'Pinkman', 'Sparrow', 'Jones', 'Bond', 'Holmes', 'Odinson', 'Strange',
      'Toretto', 'Vader', 'Solo', 'Corleone', 'Durden', 'Myers', 'Ripley', 'Connor', 'McFly', 'Croft',
      'Baggins', 'Potter', 'Lander'
    ]
  },
  Anime: {
    firstNames: [
      'Madara', 'Satoru', 'Marin', 'Mikasa', 'Eren', 'Naruto', 'Sasuke', 'Levi', 'Zoro', 'Luffy',
      'Tanjiro', 'Nezuko', 'Itachi', 'Killua', 'Gon', 'Ken', 'Lelouch', 'Light', 'Kakashi', 'Yuji',
      'Megumi', 'Nobara', 'Sukuna', 'Goku', 'Vegeta', 'Asuka', 'Shinji', 'Ryuk', 'Hisoka', 'Kurapika'
    ],
    lastNames: [
      'Uchiha', 'Gojo', 'Kitagawa', 'Ackerman', 'Yeager', 'Uzumaki', 'Kamado', 'Kirigaya', 'Sakata',
      'Kurosaki', 'Elric', 'Yagami', 'Todoroki', 'Midoriya', 'Bakugo', 'Fushiguro', 'Kugisaki', 'Itadori',
      'Senju', 'Hyuga', 'Nanami', 'Zoldyck', 'Freecss', 'Lamperouge', 'Soryu', 'Ikari'
    ]
  }
};

export function getRandomName(region: RegionType): { firstName: string; lastName: string; fullName: string } {
  const data = NAME_DATA[region];
  const first = data.firstNames[Math.floor(Math.random() * data.firstNames.length)];
  const last = data.lastNames[Math.floor(Math.random() * data.lastNames.length)];
  return {
    firstName: first,
    lastName: last,
    fullName: `${first} ${last}`
  };
}
