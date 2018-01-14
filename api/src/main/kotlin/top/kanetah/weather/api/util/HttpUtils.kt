package top.kanetah.weather.api.util

import org.apache.commons.lang.StringUtils
import org.apache.http.HttpResponse
import org.apache.http.NameValuePair
import org.apache.http.client.HttpClient
import org.apache.http.client.entity.UrlEncodedFormEntity
import org.apache.http.client.methods.HttpDelete
import org.apache.http.client.methods.HttpGet
import org.apache.http.client.methods.HttpPost
import org.apache.http.client.methods.HttpPut
import org.apache.http.conn.ClientConnectionManager
import org.apache.http.conn.scheme.Scheme
import org.apache.http.conn.scheme.SchemeRegistry
import org.apache.http.conn.ssl.SSLSocketFactory
import org.apache.http.entity.ByteArrayEntity
import org.apache.http.entity.StringEntity
import org.apache.http.impl.client.DefaultHttpClient
import org.apache.http.message.BasicNameValuePair

import javax.net.ssl.SSLContext
import javax.net.ssl.TrustManager
import javax.net.ssl.X509TrustManager
import java.io.UnsupportedEncodingException
import java.net.URLEncoder
import java.security.KeyManagementException
import java.security.NoSuchAlgorithmException
import java.security.cert.X509Certificate
import java.util.ArrayList

object HttpUtils {

    /**
     * get
     *
     * @param host
     * @param path
     * @param method
     * @param headers
     * @param querys
     * @return
     * @throws Exception
     */
    @Throws(Exception::class)
    fun doGet(host: String, path: String, method: String,
              headers: Map<String, String>,
              querys: Map<String, String>): HttpResponse {
        val httpClient = wrapClient(host)

        val request = HttpGet(buildUrl(host, path, querys))
        for ((key, value) in headers) {
            request.addHeader(key, value)
        }

        return httpClient.execute(request)
    }

    /**
     * post form
     *
     * @param host
     * @param path
     * @param method
     * @param headers
     * @param querys
     * @param bodys
     * @return
     * @throws Exception
     */
    @Throws(Exception::class)
    fun doPost(host: String, path: String, method: String,
               headers: Map<String, String>,
               querys: Map<String, String>,
               bodys: Map<String, String>?): HttpResponse {
        val httpClient = wrapClient(host)

        val request = HttpPost(buildUrl(host, path, querys))
        for ((key, value) in headers) {
            request.addHeader(key, value)
        }

        if (bodys != null) {
            val nameValuePairList = ArrayList<NameValuePair>()

            for (key in bodys.keys) {
                nameValuePairList.add(BasicNameValuePair(key, bodys[key]))
            }
            val formEntity = UrlEncodedFormEntity(nameValuePairList, "utf-8")
            formEntity.setContentType("application/x-www-form-urlencoded; charset=UTF-8")
            request.entity = formEntity
        }

        return httpClient.execute(request)
    }

    /**
     * Post String
     *
     * @param host
     * @param path
     * @param method
     * @param headers
     * @param querys
     * @param body
     * @return
     * @throws Exception
     */
    @Throws(Exception::class)
    fun doPost(host: String, path: String, method: String,
               headers: Map<String, String>,
               querys: Map<String, String>,
               body: String): HttpResponse {
        val httpClient = wrapClient(host)

        val request = HttpPost(buildUrl(host, path, querys))
        for ((key, value) in headers) {
            request.addHeader(key, value)
        }

        if (StringUtils.isNotBlank(body)) {
            request.entity = StringEntity(body, "utf-8")
        }

        return httpClient.execute(request)
    }

    /**
     * Post stream
     *
     * @param host
     * @param path
     * @param method
     * @param headers
     * @param querys
     * @param body
     * @return
     * @throws Exception
     */
    @Throws(Exception::class)
    fun doPost(host: String, path: String, method: String,
               headers: Map<String, String>,
               querys: Map<String, String>,
               body: ByteArray?): HttpResponse {
        val httpClient = wrapClient(host)

        val request = HttpPost(buildUrl(host, path, querys))
        for ((key, value) in headers) {
            request.addHeader(key, value)
        }

        if (body != null) {
            request.entity = ByteArrayEntity(body)
        }

        return httpClient.execute(request)
    }

    /**
     * Put String
     * @param host
     * @param path
     * @param method
     * @param headers
     * @param querys
     * @param body
     * @return
     * @throws Exception
     */
    @Throws(Exception::class)
    fun doPut(host: String, path: String, method: String,
              headers: Map<String, String>,
              querys: Map<String, String>,
              body: String): HttpResponse {
        val httpClient = wrapClient(host)

        val request = HttpPut(buildUrl(host, path, querys))
        for ((key, value) in headers) {
            request.addHeader(key, value)
        }

        if (StringUtils.isNotBlank(body)) {
            request.entity = StringEntity(body, "utf-8")
        }

        return httpClient.execute(request)
    }

    /**
     * Put stream
     * @param host
     * @param path
     * @param method
     * @param headers
     * @param querys
     * @param body
     * @return
     * @throws Exception
     */
    @Throws(Exception::class)
    fun doPut(host: String, path: String, method: String,
              headers: Map<String, String>,
              querys: Map<String, String>,
              body: ByteArray?): HttpResponse {
        val httpClient = wrapClient(host)

        val request = HttpPut(buildUrl(host, path, querys))
        for ((key, value) in headers) {
            request.addHeader(key, value)
        }

        if (body != null) {
            request.entity = ByteArrayEntity(body)
        }

        return httpClient.execute(request)
    }

    /**
     * Delete
     *
     * @param host
     * @param path
     * @param method
     * @param headers
     * @param querys
     * @return
     * @throws Exception
     */
    @Throws(Exception::class)
    fun doDelete(host: String, path: String, method: String,
                 headers: Map<String, String>,
                 querys: Map<String, String>): HttpResponse {
        val httpClient = wrapClient(host)

        val request = HttpDelete(buildUrl(host, path, querys))
        for ((key, value) in headers) {
            request.addHeader(key, value)
        }

        return httpClient.execute(request)
    }

    @Throws(UnsupportedEncodingException::class)
    private fun buildUrl(host: String, path: String, querys: Map<String, String>?): String {
        val sbUrl = StringBuilder()
        sbUrl.append(host)
        if (!StringUtils.isBlank(path)) {
            sbUrl.append(path)
        }
        if (null != querys) {
            val sbQuery = StringBuilder()
            for ((key, value) in querys) {
                if (0 < sbQuery.length) {
                    sbQuery.append("&")
                }
                if (StringUtils.isBlank(key) && !StringUtils.isBlank(value)) {
                    sbQuery.append(value)
                }
                if (!StringUtils.isBlank(key)) {
                    sbQuery.append(key)
                    if (!StringUtils.isBlank(value)) {
                        sbQuery.append("=")
                        sbQuery.append(URLEncoder.encode(value, "utf-8"))
                    }
                }
            }
            if (0 < sbQuery.length) {
                sbUrl.append("?").append(sbQuery)
            }
        }

        return sbUrl.toString()
    }

    private fun wrapClient(host: String): HttpClient {
        val httpClient = DefaultHttpClient()
        if (host.startsWith("https://")) {
            sslClient(httpClient)
        }

        return httpClient
    }

    private fun sslClient(httpClient: HttpClient) {
        try {
            val ctx = SSLContext.getInstance("TLS")
            val tm = object : X509TrustManager {
                override fun getAcceptedIssuers(): Array<X509Certificate>? {
                    return null
                }

                override fun checkClientTrusted(xcs: Array<X509Certificate>, str: String) {

                }

                override fun checkServerTrusted(xcs: Array<X509Certificate>, str: String) {

                }
            }
            ctx.init(null, arrayOf<TrustManager>(tm), null)
            val ssf = SSLSocketFactory(ctx)
            ssf.hostnameVerifier = SSLSocketFactory.ALLOW_ALL_HOSTNAME_VERIFIER
            val ccm = httpClient.connectionManager
            val registry = ccm.schemeRegistry
            registry.register(Scheme("https", 443, ssf))
        } catch (ex: KeyManagementException) {
            throw RuntimeException(ex)
        } catch (ex: NoSuchAlgorithmException) {
            throw RuntimeException(ex)
        }

    }
}