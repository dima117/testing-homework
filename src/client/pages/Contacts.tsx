import React from "react";
import { Helmet } from "react-helmet";
import { cn } from "@bem-react/classname";

const bem = cn("Contacts");

export const Contacts: React.FC = () => {
  return (
    <div className={bem()}>
      <Helmet title="Contacts" />
      <div className="row">
        <div className="col">
          <h1>Contacts</h1>

          <p>
            Have a question about our scratchers or need help placing an order?
            Don't hesitate to reach out to us! Our dedicated team is here to
            provide you with top-notch service and support.
          </p>
          <p>
            Our friendly representatives are available during business hours to
            assist you with any inquiries you may have.
          </p>
          <p>
            At our store, customer satisfaction is our priority, and we're
            committed to ensuring you have a smooth and enjoyable shopping
            experience. Reach out to us today – we're here to help make your
            cat's scratching dreams a reality!
          </p>
        </div>
      </div>
    </div>
  );
};
