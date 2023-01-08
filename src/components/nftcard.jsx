import {ClipboardIcon} from '@heroicons/react/outline';

const NftCard = ({ image, id, title, address, description, attributes, chain }) => {
  return (
    <div className="w-1/4 mr-3 mb-4 bg-slate-100 rounded-md shadow-md">
      <div className="w-full rounded-t-md h-72 overflow-hidden">
        <img
          className="w-full rounded-t-md h-full object-cover"
          alt={id}
          src={image}
        ></img>
      </div>
      <div className="p-3">
        <div className="flex mb-3">
          <div className="flex-grow">
            <h3 className="text-xl">{title ? title : 'No title'}</h3>
            <p>{`${id.slice(0, 4)}...${id.slice(id.length - 4)}`}</p>
          </div>
          <div className="flex mr-3">
            <a
              target="_blank"
              className="text-blue-700"
              href={chain === "Ethereum" ? `https://etherscan.io/token/${address}` : chain === "Polygon" ? `https://polygonscan.com/token/${address}` : ""}
              rel="noreferrer"
            >{`${address.slice(0, 4)}...${address.slice(
              address.length - 4
            )}`}</a>
            <ClipboardIcon
              onClick={() => navigator.clipboard.writeText(address)}
              className="h-4 w-4 -mt-1 text-black cursor-pointer"
            ></ClipboardIcon>
          </div>
        </div>
        <p>{description ? description.slice(0, 200) : 'No Description'}</p>
      </div>
      <div className="flex flex-wrap justify-center items-center p-3 ">
        {attributes?.length > 0 &&
          attributes.map((attribute, index) => {
            return (
              <div key={index} className="w-1/2 mb-2 flex justify-start flex-col">
                <p className="mr-2 font-bold">{attribute.trait_type}:</p>
                <p className="text-sm">{attribute.value}</p>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default NftCard;
