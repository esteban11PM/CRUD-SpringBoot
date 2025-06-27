CREATE TABLE membership (
    id bigserial PRIMARY KEY,
    type text NOT NULL,
    duration_months int NOT NULL,
    price decimal(10, 2) NOT NULL
);

CREATE TABLE client (
    id bigserial PRIMARY KEY,
    first_name text NOT NULL,
    last_name text NOT NULL,
    phone text,
    membership_end_date date,
    membership_start_date date,
    membership_id bigint REFERENCES membership(id)
);

CREATE TABLE instructor (
    id bigserial PRIMARY KEY,
    name text NOT NULL,
    specialties text
);

CREATE TABLE class (
    id bigserial PRIMARY KEY,
    type text NOT NULL,
    schedule timestamptz NOT NULL,
    duration time NOT NULL,
    max_capacity int,
    instructor_id bigint REFERENCES instructor(id)
);

CREATE TABLE area (
    id bigserial PRIMARY KEY,
    name text NOT NULL,
    description text
);

CREATE TABLE equipment (
    id bigserial PRIMARY KEY,
    name text NOT NULL,
    location text NOT NULL,
    area_id bigint REFERENCES area(id)
);

CREATE TABLE class_registration (
    id bigserial PRIMARY KEY,
    client_id bigint NOT NULL REFERENCES client(id),
    class_id bigint NOT NULL REFERENCES class(id)
);

CREATE TABLE equipment_usage (
    id bigserial PRIMARY KEY,
    class_id bigint NOT NULL REFERENCES class(id),
    equipment_id bigint NOT NULL REFERENCES equipment(id),
    usage_date date,
    start_time time,
    end_time time
);

CREATE TABLE payment (
    id bigserial PRIMARY KEY,
    client_id bigint NOT NULL REFERENCES client(id),
    amount decimal(10, 2) NOT NULL,
    payment_date date NOT NULL,
    payment_method text NOT NULL
);

CREATE TABLE attendance (
    id bigserial PRIMARY KEY,
    client_id bigint NOT NULL REFERENCES client(id),
    class_id bigint NOT NULL REFERENCES class(id),
    attendance_date date NOT NULL
);

CREATE TABLE ratings (
    id bigserial PRIMARY KEY,
    client_id bigint NOT NULL REFERENCES client(id),
    class_id bigint NOT NULL REFERENCES class(id),
    rating int NOT NULL CHECK (rating BETWEEN 1 AND 5),
    comment text,
    rating_date date NOT NULL
);