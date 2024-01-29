import React from 'react';

function Breadcrumbs({ crumbs }: { crumbs: any }) {
  const isDashboardPage = crumbs.length === 1;
  const isFarmPage = crumbs.length === 2;
  const isTurbinePage = crumbs.length === 3;

  return (
    <nav
      className="flex px-5 py-3 text-gray-700 border border-gray-200 rounded-lg bg-gray-50 mb-3 mt-2 grow"
      aria-label="Breadcrumb"
    >
      {crumbs.length > 0 && (
        <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
          <li className="inline-flex items-center">
            <a
              href="/farms"
              className={`inline-flex items-center text-sm font-medium text-gray-700 hover:text-[#649dad] ${isDashboardPage ? 'pointer-events-none text-gray-500' : ''}`}
            >
              <svg
                className="w-3 h-3 me-2.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
              </svg>
              Farms
            </a>
          </li>

          {(isFarmPage || isTurbinePage) && (
            <li>
              <div className="flex items-center">
                <svg
                  className="rtl:rotate-180 block w-3 h-3 mx-1 text-gray-400 "
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 9 4-4-4-4"
                  />
                </svg>
                <a
                  href={`/farm/${crumbs[1].farmId}`}
                  className={`ms-1 text-sm font-medium text-gray-700 hover:text-[#649dad] md:ms-2 ${isFarmPage ? 'pointer-events-none text-gray-500' : ''}`}
                >
                  {crumbs[1].title}
                </a>
              </div>
            </li>
          )}

          {isTurbinePage && (
            <li aria-current="page">
              <div className="flex items-center">
                <svg
                  className="rtl:rotate-180  w-3 h-3 mx-1 text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 9 4-4-4-4"
                  />
                </svg>
                <span className="ms-1 text-sm font-medium text-gray-500 md:ms-2">{crumbs[2].title}</span>
              </div>
            </li>
          )}
        </ol>
      )}
    </nav>
  );
}

export default Breadcrumbs;
