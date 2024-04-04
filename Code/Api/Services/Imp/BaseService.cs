using Foundation;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Services.Imp
{
    public class BaseService
    {
        protected IConfiguration _configurationBase;

        protected async Task<List<T>> GetListFromStoreProcedureOfType<T>(string storeProcedure, object anonymousParameter = null) where T : class, new()
        {
            SqlConnection cnn = null;
            try
            {
                var items = new List<T>();
                cnn = await Connect();
                var cmd = GetSqlCommand(cnn, storeProcedure);

                if (cmd != null)
                {
                    if (anonymousParameter != null)
                    {
                        var parameters = BuildParameters(anonymousParameter);
                        if (parameters != null)
                        {
                            cmd.Parameters.AddRange(parameters);
                        }
                    }

                    var reader = await cmd.ExecuteReaderAsync();

                    items = await GetListFromDataReaderOfType<T>(reader);
                }

                return items;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                throw;
            }
            finally
            {
                cnn.Close();
            }
        }

        protected async Task<T> GetItemFromStoreProcedureOfType<T>(string storeProcedure, object anonymousParameter = null) where T : class, new()
        {
            SqlConnection cnn = null;
            try
            {
                var item = new T();

                cnn = await Connect();
                var cmd = GetSqlCommand(cnn, storeProcedure);

                if (cmd != null)
                {
                    if (anonymousParameter != null)
                    {
                        var parameters = BuildParameters(anonymousParameter);
                        if (parameters != null)
                        {
                            cmd.Parameters.AddRange(parameters);
                        }
                    }

                    var reader = await cmd.ExecuteReaderAsync();

                    await reader.ReadAsync();

                    item = GetItemFromDataReaderOfType<T>(reader);
                }

                return item;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                throw;
            }
            finally
            {
                cnn.Close();
            }
        }

        protected async Task<SqlDataReader> GetDataReaderFromStoreProcedure(string storeProcedure, object anonymousParameter = null)
        {
            SqlConnection cnn = null;
            try
            {
                cnn = await Connect();
                var cmd = GetSqlCommand(cnn, storeProcedure);

                if (cmd != null)
                {
                    if (anonymousParameter != null)
                    {
                        var parameters = BuildParameters(anonymousParameter);
                        if (parameters != null)
                        {
                            cmd.Parameters.AddRange(parameters);
                        }
                    }

                    var reader = await cmd.ExecuteReaderAsync();
                    return reader;
                }

                return null;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                throw;
            }
            /*finally
            {
                cnn.Close();
            }*/
        }

        protected async Task<List<T>> GetListFromDataReaderOfType<T>(SqlDataReader reader) where T : class, new()
        {
            try
            {
                var items = new List<T>();

                while (await reader.ReadAsync())
                {
                    var data = GetItemFromDataReaderOfType<T>(reader);
                    if (data != null)
                    {
                        items.Add(data);
                    }
                }

                return items;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                throw;
            }
        }

        protected T GetItemFromDataReaderOfType<T>(SqlDataReader dataReader) where T : class, new()
        {
            if (dataReader != null)
            {
                var item = new T();
                var type = item.GetType();
                var properties = type.GetProperties();
                var dt = dataReader.GetSchemaTable();
                if (dt != null)
                {

                    var columns = dt.AsEnumerable().Select(x => x["ColumnName"].ToString()).ToList();

                    foreach (var prop in properties)
                    {
                        try
                        {
                            var cn = columns.FirstOrDefault(s => s.ToUpper() == prop.Name.ToUpper());
                            if (!string.IsNullOrEmpty(cn))
                            {
                                var dataValue = dataReader[cn];
                                if (dataValue != null)
                                {
                                    var data = Convert.ChangeType(dataValue, prop.PropertyType);
                                    if (data != null)
                                    {
                                        prop.SetValue(item, data);
                                    }
                                }

                            }
                        }
                        catch (Exception)
                        {
                        }
                    }
                }

                return item;
            }

            return null;
        }

        private SqlParameter[] BuildParameters(object anonymousParameter)
        {
            var parameters = new List<SqlParameter>();
            var type = anonymousParameter.GetType();
            var properties = type.GetProperties();

            foreach (var p in properties)
            {
                var value = p.GetValue(anonymousParameter);
                if (value != null)
                {
                    parameters.Add(new SqlParameter { ParameterName = p.Name, Value = value });
                }
            }

            return parameters.ToArray();
        }

        private SqlCommand GetSqlCommand(SqlConnection conn, string command, CommandType commandType = CommandType.StoredProcedure)
        {
            using (var cmd = new SqlCommand(command, conn))
            {
                cmd.CommandTimeout = ApplicationSettings.CommandTimeout;
                cmd.CommandType = commandType;

                return cmd;
            }
        }

        protected async Task<SqlConnection> Connect()
        {
            var conn = new SqlConnection(_configurationBase.GetValue<string>("ConnectionStrings:DefaultConnection"));
            await conn.OpenAsync();

            return conn;
        }
    }
}
