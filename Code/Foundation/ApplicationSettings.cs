using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Foundation
{
    public static class ApplicationSettings
    {
        public static int CommandTimeout { get; set; }

        static ApplicationSettings()
        {
            CommandTimeout = 90;
        }
    }
}
