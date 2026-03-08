CREATE TABLE companies (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text,
  plan text,
  created_at timestamp DEFAULT now()
);

CREATE TABLE users (
  id uuid PRIMARY KEY,
  company_id uuid REFERENCES companies(id),
  name text,
  email text,
  role text,
  created_at timestamp DEFAULT now()
);

CREATE TABLE properties (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id uuid REFERENCES companies(id),
  name text,
  location text,
  capacity integer,
  status text,
  created_at timestamp DEFAULT now()
);

CREATE TABLE reservations (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  property_id uuid REFERENCES properties(id),
  guest_name text,
  checkin date,
  checkout date,
  price numeric,
  status text,
  created_at timestamp DEFAULT now()
);

CREATE TABLE expenses (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  property_id uuid REFERENCES properties(id),
  category text,
  amount numeric,
  description text,
  date date
);

CREATE TABLE maintenance (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  property_id uuid REFERENCES properties(id),
  issue text,
  status text,
  cost numeric,
  created_at timestamp DEFAULT now()
);
