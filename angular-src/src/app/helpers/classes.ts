export class Vacation {
  name = '';
  price = 0;
  totalDays : number = 0;
  guests: Guest[];
  newFlag: Boolean = true;
}

export class Guest {
  guestName = 'Enter guest name';
  guestDays : number  = 0;
  amountOwed : number = 0;
  guestEmail = 'Enter guest email';
}
