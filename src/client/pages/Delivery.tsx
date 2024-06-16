import React from "react";
import { Helmet } from "react-helmet";
import { cn } from "@bem-react/classname";

import { Image } from "../components/Image";

const bem = cn("Delivery");

export const Delivery: React.FC = () => {
  return (
    <div className={bem()}>
      <Helmet title="Delivery" />
      <div className="row">
        <div className="col">
          <h1>Delivery</h1>
          <p>
            Swift and Secure Delivery: Experience the convenience of hassle-free
            shipping with our scratchers. We understand the excitement of
            receiving your new cat furniture, so we prioritize swift delivery to
            your doorstep. Rest assured, your order is handled with care every
            step of the way, ensuring it arrives safely and securely.
          </p>
          <Image className="w-25 mb-4" />
          <p>
            Track Your Package with Ease: Stay informed and in control of your
            delivery with our easy-to-use tracking system. From the moment your
            order is placed to the minute it reaches your home, you can monitor
            its journey in real-time. No more guessing games – know exactly when
            to expect your package and plan accordingly.
          </p>
          <p>
            Customer Satisfaction Guaranteed: Your satisfaction is our top
            priority, which is why we go above and beyond to provide exceptional
            delivery service. If you have any questions or concerns about your
            shipment, our dedicated customer support team is here to assist you
            every step of the way. Trust us to deliver not only your scratcher
            but also peace of mind.
          </p>
        </div>
      </div>
    </div>
  );
};
