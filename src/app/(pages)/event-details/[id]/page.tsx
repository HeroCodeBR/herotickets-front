import { FormWrapper } from '@/app/components/FormWrapper';

export default function EventDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div>
      <div
        className="w-full h-[280px] relative bg-black   shadow bg-cover bg-center"
        // style={{ backgroundImage: `url(${image})` }}
      >
        <div className="p-5 text-white absolute bottom-0">
          <h3 className="text-5xl pb-4 font-bold">fgfdgh</h3>
          <div className="flex">
            <div className="mr-4 flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
                />
              </svg>
              <p>fghfg</p>
            </div>
            <div className="mr-4 flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                />
              </svg>

              <p>dfgdfg</p>
            </div>
            <div className="mr-4 flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>

              <p>h </p>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 text-blue p-4 mr-14">
        <div>
          <p>desasdfasdf</p>
        </div>
        <div>
          <FormWrapper />
        </div>
      </div>
    </div>
  );
}
