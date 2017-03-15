export class Vacation {
  id = 0;
  name = '';
  price = 0;
  totalDays : number = 0;
  guests: Guest[];
}

export class Guest {
  guestName = 'Enter guest name';
  guestDays : number  = 0;
  guestAmount : number = 0;
  guestEmail = 'Enter guest email';
}
